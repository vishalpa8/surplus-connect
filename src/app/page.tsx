'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from './(auth)/login/LoginForm'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const stored = localStorage.getItem('demoUser')
    if (stored) {
      const { role } = JSON.parse(stored)
      router.replace(role === 'admin' ? '/admin' : '/dashboard')
    }
  }, [router])

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-20 px-4 max-w-md">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Surplus Connect</h1>
      <p className="text-muted-foreground mb-6 text-center">
        Sign in to access your dashboard and start rescuing food.
      </p>
      <LoginForm />
    </div>
  )
}
