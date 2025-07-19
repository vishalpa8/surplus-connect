'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { HandHeart, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link href="/" className="flex items-center justify-center gap-2 text-xl font-bold">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white">
                <HandHeart size={24} />
              </div>
              <span className="font-display text-2xl font-bold text-gray-800">
                Surplus<span className="text-primary-600">Connect</span>
              </span>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot Your Password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              No problem. Enter your email below and we'll send you a link to reset it.
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="text-center bg-primary-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-primary-700">Check Your Inbox</h3>
              <p className="mt-2 text-gray-600">
                If an account with that email exists, we've sent a password reset link to <strong>{email}</strong>.
              </p>
              <Link href="/auth/login">
                <Button size="lg" className="mt-6 w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <Input
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                <Send className="mr-2 h-5 w-5" />
                Send Reset Link
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/auth/login" className="font-bold text-primary-600 hover:text-primary-700">
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 opacity-40"></div>
        <div className="h-full w-full object-cover flex items-center justify-center p-12">
            <div className="text-center text-white bg-primary-600/80 p-12 rounded-3xl shadow-soft-xl backdrop-blur-md">
                <h2 className="font-display text-4xl font-bold">We've Got Your Back</h2>
                <p className="mt-4 text-lg">Our community is built on trust and support. We'll help you get back into your account in no time.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
