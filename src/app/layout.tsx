import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { setupGlobalErrorHandlers } from "@/lib/errorHandling";
import { useEffect } from "react";

// Setup global error handlers
if (typeof window !== 'undefined') {
  setupGlobalErrorHandlers();
}

// Using system fonts as fallback for better performance and reliability
const fontVariables = {
  '--font-nunito': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  '--font-poppins': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
};

export const metadata = {
  title: "Surplus Connect - Rescue Food, Reduce Waste",
  description: "A modern, mobile-first platform that connects food vendors with consumers and NGOs to rescue surplus food.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className="font-sans" 
        
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <ClientProviders>
            {children}
            <ConditionalFooter />
          </ClientProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}