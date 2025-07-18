'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, UtensilsCrossed } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [role, setRole] = useState<string | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const demoUser = localStorage.getItem('demoUser')
      if (demoUser) {
        const parsed = JSON.parse(demoUser)
        setUser(parsed)
        setRole(parsed.role)
      } else {
        setUser(null)
        setRole(null)
      }
    }
  }, [pathname])

  const handleSignOut = async () => {
    localStorage.removeItem('demoUser')
    setUser(null)
    setRole(null)
    window.location.href = '/'
  }

  const closeSheet = () => setIsSheetOpen(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/map', label: 'Map' },
    { href: '/pricing', label: 'Pricing' },
  ]
  if (role === 'admin') {
    navLinks.push({ href: '/admin', label: 'Admin' })
  } else if (role === 'vendor' || role === 'user') {
    navLinks.push({ href: '/dashboard', label: 'Dashboard' })
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className={`flex items-center gap-2 text-2xl font-bold text-primary transition-colors ${pathname !== '/' ? '' : 'text-foreground'}`}
            style={{ minWidth: 160 }}>
            {pathname !== '/' && <UtensilsCrossed className="h-6 w-6" />}
            <span className="tracking-tight">SurplusConnect</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden lg:inline-block">
                  {user.email}
                </span>
                <Button onClick={handleSignOut} variant="outline" size="sm">Sign Out</Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex flex-col h-full">
                  <div className="flex-grow space-y-4 py-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeSheet}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors ${
                          pathname === link.href
                            ? 'bg-muted text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-primary'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t pt-6">
                    {user ? (
                      <div className="space-y-4">
                        <p className="text-sm text-center text-muted-foreground">{user.email}</p>
                        <Button onClick={() => { handleSignOut(); closeSheet(); }} variant="outline" className="w-full">Sign Out</Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button asChild className="w-full">
                          <Link href="/login" onClick={closeSheet}>Login</Link>
                        </Button>
                        <Button asChild variant="secondary" className="w-full">
                          <Link href="/signup" onClick={closeSheet}>Sign Up</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}