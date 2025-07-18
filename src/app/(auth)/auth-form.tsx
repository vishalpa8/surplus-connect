'use client';

// --- Demo credentials ---
const DEMO_USERS = [
  { email: 'user@example.com', password: 'userpass', role: 'user', name: 'Demo User' },
  { email: 'vendor@example.com', password: 'vendorpass', role: 'vendor', name: 'Demo Vendor' },
  { email: 'admin@example.com', password: 'adminpass', role: 'admin', name: 'Demo Admin' },
];

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UtensilsCrossed } from "lucide-react";
// --- Enable Supabase Auth for social login ---
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "next-themes";

interface AuthFormProps {
  view: "sign_up" | "login";
}

function getRoleFromEmail(email: string): 'admin' | 'vendor' | 'user' {
  if (email === 'admin@example.com') return 'admin';
  if (email === 'vendor@example.com') return 'vendor';
  return 'user';
}

export default function AuthForm({ view }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (view === "login") {
      const found = DEMO_USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (found) {
        localStorage.setItem("demoUser", JSON.stringify(found));
        if (found.role === "admin") router.push("/admin");
        else router.push("/dashboard");
      } else {
        setError("Invalid credentials. Try the demo accounts or use social login.");
      }
    } else {
      // Signup: auto-assign role based on email
      const role = getRoleFromEmail(email);
      const newUser = { email, password, role, name, phone, organization };
      localStorage.setItem("demoUser", JSON.stringify(newUser));
      if (role === "admin") router.push("/admin");
      else router.push("/dashboard");
    }
  };

  const getRedirectURL = (): string => {
    let siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000";
    if (!siteUrl.startsWith("http")) siteUrl = `https://${siteUrl}`;
    return `${siteUrl.replace(/\/+$/, "")}/auth/callback`;
  };

  const customTheme = {
    default: {
      colors: {
        brand: "hsl(var(--primary))",
        brandAccent: "hsl(var(--primary))",
        brandButtonText: "hsl(var(--primary-foreground))",
        defaultButtonBackground: "hsl(var(--card))",
        defaultButtonBackgroundHover: "hsl(var(--accent))",
        defaultButtonBorder: "hsl(var(--border))",
        defaultButtonText: "hsl(var(--foreground))",
        dividerBackground: "hsl(var(--border))",
        inputBackground: "hsl(var(--background))",
        inputBorder: "hsl(var(--border))",
        inputBorderHover: "hsl(var(--ring))",
        inputBorderFocus: "hsl(var(--ring))",
        inputText: "hsl(var(--foreground))",
        inputLabelText: "hsl(var(--muted-foreground))",
        inputPlaceholder: "hsl(var(--muted-foreground))",
        messageText: "hsl(var(--muted-foreground))",
        messageTextDanger: "hsl(var(--destructive))",
        anchorTextColor: "hsl(var(--primary))",
        anchorTextHoverColor: "hsl(var(--primary) / 0.8)",
      },
      space: {
        spaceSmall: "4px",
        spaceMedium: "8px",
        spaceLarge: "16px",
        labelBottomMargin: "8px",
        anchorBottomMargin: "4px",
        emailInputSpacing: "8px",
        socialAuthSpacing: "16px",
        buttonPadding: "10px 15px",
        inputPadding: "10px 15px",
      },
      fontSizes: {
        baseBodySize: "14px",
        baseInputSize: "14px",
        baseLabelSize: "14px",
        baseButtonSize: "14px",
      },
      fonts: {
        bodyFontFamily: "inherit",
        buttonFontFamily: "inherit",
        inputFontFamily: "inherit",
        labelFontFamily: "inherit",
      },
      borderWidths: {
        buttonBorderWidth: "1px",
        inputBorderWidth: "1px",
      },
      radii: {
        borderRadiusButton: "var(--radius)",
        buttonBorderRadius: "var(--radius)",
        inputBorderRadius: "var(--radius)",
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-15rem)] py-12 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <UtensilsCrossed className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">
            {view === "login" ? "Welcome Back" : "Create an Account"}
          </CardTitle>
          <CardDescription>
            {view === "login"
              ? "Sign in to access your dashboard."
              : "Enter your details to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Social login (Supabase Auth) for both login and signup */}
          <div className="mb-6">
            <Auth
              supabaseClient={supabase}
              view={view}
              appearance={{ theme: customTheme }}
              showLinks={false}
              providers={["google", "github"]}
              redirectTo={getRedirectURL()}
              localization={{
                variables: {
                  sign_up: {
                    email_label: "Email Address",
                    password_label: "Create a Password",
                    button_label: "Sign Up with Email",
                    social_provider_text: "Continue with {{provider}}",
                    link_text: "Already have an account? Sign in",
                  },
                  sign_in: {
                    email_label: "Email Address",
                    password_label: "Your Password",
                    button_label: "Sign In with Email",
                    social_provider_text: "Continue with {{provider}}",
                    link_text: "Don't have an account? Sign up",
                  },
                },
              }}
            />
          </div>
          {/* Demo email/password fallback */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {view === "sign_up" && (
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  className="w-full border border-border rounded px-3 py-2 bg-background"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                className="w-full border border-border rounded px-3 py-2 bg-background"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium mb-1">Password</label>
              <input
                id="password"
                type="password"
                className="w-full border border-border rounded px-3 py-2 bg-background"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {view === "sign_up" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-medium mb-1">Phone (optional)</label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full border border-border rounded px-3 py-2 bg-background"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="organization" className="block font-medium mb-1">Organization (optional)</label>
                  <input
                    id="organization"
                    type="text"
                    className="w-full border border-border rounded px-3 py-2 bg-background"
                    placeholder="Organization name"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
              </>
            )}
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold shadow hover:bg-primary/90 transition-colors"
            >
              {view === "login" ? "Sign In" : "Sign Up"}
            </button>
            {view === "login" && (
              <p className="text-xs text-muted-foreground mt-2">
                Demo accounts:<br />
                user@example.com / userpass<br />
                vendor@example.com / vendorpass<br />
                admin@example.com / adminpass
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
