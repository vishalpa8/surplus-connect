'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UtensilsCrossed, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_USERS = [
  { email: 'user@example.com', password: 'userpass', role: 'user', name: 'Demo User' },
  { email: 'vendor@example.com', password: 'vendorpass', role: 'vendor', name: 'Demo Vendor' },
  { email: 'ngo@example.com', password: 'ngopass', role: 'ngo', name: 'Demo NGO' },
  { email: 'admin@example.com', password: 'adminpass', role: 'admin', name: 'Demo Admin' },
];

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: getRedirectURL() } });
  };

  const getRedirectURL = (): string => {
    let siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000";
    if (!siteUrl.startsWith("http")) siteUrl = `https://${siteUrl}`;
    return `${siteUrl.replace(/\/+$/, "")}/auth/callback`;
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-15rem)] py-12 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <UtensilsCrossed className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-background border border-border rounded py-2 font-semibold shadow hover:bg-muted transition-colors"
              onClick={() => handleSocialLogin('google')}
            >
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none"><g><path d="M44.5 20H24V28.5H36.9C35.5 33.1 31.2 36.5 24 36.5C16.5 36.5 10.5 30.5 10.5 23C10.5 15.5 16.5 9.5 24 9.5C27.2 9.5 29.8 10.6 31.8 12.4L37.2 7C33.7 3.8 29.2 2 24 2C12.9 2 4 10.9 4 23C4 35.1 12.9 44 24 44C35.1 44 44 35.1 44 23C44 21.7 44.8 20.8 44.5 20Z" fill="#FFC107"/><path d="M6.3 14.7L12.7 19.2C14.5 15.2 18.8 12.5 24 12.5C27.2 12.5 29.8 13.6 31.8 15.4L37.2 10C33.7 6.8 29.2 5 24 5C16.5 5 10.5 11 10.5 18.5C10.5 20.1 10.8 21.6 11.3 23H24V20H6.3Z" fill="#FF3D00"/><path d="M24 44C29.2 44 33.7 42.2 37.2 39L31.8 33.6C29.8 35.4 27.2 36.5 24 36.5C18.8 36.5 14.5 33.8 12.7 29.8L6.3 34.3C10.8 39.2 16.5 44 24 44Z" fill="#4CAF50"/><path d="M44.5 20H24V28.5H36.9C36.2 30.7 34.7 32.6 32.7 33.6L37.2 39C40.2 36.2 42.5 32.2 44 28.5C44.8 26.7 44.5 20 44.5 20Z" fill="#1976D2"/></g></svg>
              Sign in with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-background border border-border rounded py-2 font-semibold shadow hover:bg-muted transition-colors"
              onClick={() => handleSocialLogin('github')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48C19.138 20.204 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" fill="#181717"/></svg>
              Sign in with GitHub
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 relative">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-muted-foreground"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold shadow hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Demo accounts:<br />
              user@example.com / userpass<br />
              vendor@example.com / vendorpass<br />
              ngo@example.com / ngopass<br />
              admin@example.com / adminpass
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 