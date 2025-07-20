"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { SocialLogin } from "@/components/auth/SocialLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HandHeart, LogIn, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, error, clearError, resendVerification } = useAuth();
  const router = useRouter();

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case "vendor":
        return "/dashboard/vendor";
      case "ngo":
        return "/dashboard/ngo";
      default:
        return "/dashboard";
    }
  };

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!password) {
      toast.error("Please enter your password");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    clearError();
    setShowResendVerification(false);

    try {
      const user = await login(email, password, rememberMe);

      toast.success(`Welcome back, ${user.name}!`);

      // Redirect based on user role
      const dashboardRoute = getDashboardRoute(user.role);
      router.push(dashboardRoute);
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.code === "EMAIL_NOT_VERIFIED") {
        setShowResendVerification(true);
        toast.error("Please verify your email address to continue");
      } else if (error.code === "USER_NOT_FOUND") {
        toast.error("No account found with this email address");
      } else if (error.code === "INVALID_CREDENTIALS") {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await resendVerification(email);
      toast.success("Verification email sent! Please check your inbox.");
      setShowResendVerification(false);
    } catch (error) {
      toast.error("Failed to send verification email. Please try again.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.success(`${provider} login will be available soon!`);
  };

  // Demo credentials helper
  const fillDemoCredentials = (role: "vendor" | "ngo" | "consumer") => {
    const credentials = {
      vendor: { email: "vendor@example.com", password: "password123" },
      ngo: { email: "ngo@example.com", password: "password123" },
      consumer: { email: "consumer@example.com", password: "password123" },
    };

    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
    toast.success(`Demo ${role} credentials filled`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent via-primary-50 to-secondary-50">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white transition-transform group-hover:scale-105">
              <HandHeart className="h-7 w-7" />
            </div>
            <span className="font-display text-2xl font-bold text-gray-800">
              Surplus<span className="text-primary-600">Connect</span>
            </span>
          </Link>

          <div className="mt-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back!
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Sign in to your account to continue rescuing food and making a
              difference.
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-soft-xl border border-gray-100 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-50 border border-error-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-error-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-error-700 font-medium">
                    {error.message}
                  </p>
                  {showResendVerification && (
                    <button
                      onClick={handleResendVerification}
                      className="mt-2 text-sm text-error-600 hover:text-error-700 underline"
                    >
                      Resend verification email
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              placeholder="Enter your email address"
              disabled={isLoading}
            />

            {/* Password Input */}
            <PasswordInput
              id="password"
              label="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              placeholder="Enter your password"
              disabled={isLoading}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-bold text-primary-600 hover:text-primary-700">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {!isLoading && <LogIn className="mr-2 h-5 w-5" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Demo Accounts:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="soft"
                size="sm"
                onClick={() => fillDemoCredentials("consumer")}
                disabled={isLoading}
              >
                Consumer
              </Button>
              <Button
                type="button"
                variant="soft"
                size="sm"
                onClick={() => fillDemoCredentials("vendor")}
                disabled={isLoading}
              >
                Vendor
              </Button>
              <Button
                type="button"
                variant="soft"
                size="sm"
                onClick={() => fillDemoCredentials("ngo")}
                disabled={isLoading}
              >
                NGO
              </Button>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <SocialLogin
              onGoogleLogin={() => handleSocialLogin("Google")}
              onFacebookLogin={() => handleSocialLogin("Facebook")}
              isLoading={isLoading}
            />
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Create your account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link
              href="/privacy"
              className="text-primary-600 hover:text-primary-700"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="text-primary-600 hover:text-primary-700"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
