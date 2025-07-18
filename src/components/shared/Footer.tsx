'use client';

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  const year = new Date().getFullYear()
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {year} SurplusConnect. A Non-Profit Initiative.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}