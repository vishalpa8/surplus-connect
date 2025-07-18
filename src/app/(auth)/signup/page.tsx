"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from './SignupForm';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('demoUser');
    if (stored) {
      const { role } = JSON.parse(stored);
      if (role === 'admin') router.replace('/admin');
      else router.replace('/dashboard');
    }
  }, [router]);

  return <SignupForm />;
}
