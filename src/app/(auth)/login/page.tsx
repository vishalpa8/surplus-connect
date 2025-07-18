"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('demoUser');
    if (stored) {
      const { role } = JSON.parse(stored);
      if (role === 'admin') router.replace('/admin');
      else router.replace('/dashboard');
    }
  }, [router]);

  return <LoginForm />;
}
