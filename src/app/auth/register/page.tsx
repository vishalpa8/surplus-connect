'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HandHeart, UserPlus } from 'lucide-react';
import { RoleSelector } from '@/components/ui/RoleSelector';

type UserRole = 'vendor' | 'ngo' | 'consumer';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('consumer');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setIsLoading(true);

    let isValid = true;

    if (!name) {
      setNameError('Full Name is required.');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Invalid email format.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      await register(email, password, role, name);
      router.push('/dashboard');
    } catch (err) {
      // Keep general error for registration failure (e.g., email already in use)
      setEmailError('Failed to create an account. The email might already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        <div>
          <Link href="/" className="flex items-center justify-center gap-2 text-xl font-bold">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white flex-shrink-0">
              <HandHeart size={24} className="h-6 w-6 shrink-0" />
            </div>
            <span className="font-display text-2xl font-bold text-gray-800">
              Surplus<span className="text-primary-600">Connect</span>
            </span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the community and start making a difference today.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <RoleSelector selectedRole={role} setSelectedRole={(r) => setRole(r as UserRole)} />

          <Input
            id="name"
            label="Full Name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            error={nameError}
          />

          <Input
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={emailError}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={passwordError}
          />

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            error={confirmPasswordError}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Create Account
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}