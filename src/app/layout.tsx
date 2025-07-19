import "./globals.css";
import { Nunito, Poppins } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

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
      <body className={`${nunito.variable} ${poppins.variable} font-sans`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
