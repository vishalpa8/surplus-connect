'use client'
import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UtensilsCrossed } from 'lucide-react'

export default function AuthForm({ view }: { view: 'login' | 'sign_up' }) {
  const supabase = createClient()
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') {
        router.push('/dashboard')
      }
      if (event === 'SIGNED_OUT') {
        router.push('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      'http://localhost:3000/'
    url = url.includes('http') ? url : `https://${url}`
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return `${url}auth/callback`
  }

  const customTheme = {
    default: {
      colors: {
        brand: 'hsl(var(--primary))',
        brandAccent: 'hsl(var(--primary))',
        brandButtonText: 'hsl(var(--primary-foreground))',
        defaultButtonBackground: 'hsl(var(--card))',
        defaultButtonBackgroundHover: 'hsl(var(--accent))',
        defaultButtonBorder: 'hsl(var(--border))',
        defaultButtonText: 'hsl(var(--foreground))',
        dividerBackground: 'hsl(var(--border))',
        inputBackground: 'hsl(var(--background))',
        inputBorder: 'hsl(var(--border))',
        inputBorderHover: 'hsl(var(--ring))',
        inputBorderFocus: 'hsl(var(--ring))',
        inputText: 'hsl(var(--foreground))',
        inputLabelText: 'hsl(var(--muted-foreground))',
        inputPlaceholder: 'hsl(var(--muted-foreground))',
        messageText: 'hsl(var(--muted-foreground))',
        messageTextDanger: 'hsl(var(--destructive))',
        anchorTextColor: 'hsl(var(--primary))',
        anchorTextHoverColor: 'hsl(var(--primary) / 0.8)',
      },
      space: {
        spaceSmall: '4px',
        spaceMedium: '8px',
        spaceLarge: '16px',
        labelBottomMargin: '8px',
        anchorBottomMargin: '4px',
        emailInputSpacing: '8px',
        socialAuthSpacing: '16px',
        buttonPadding: '10px 15px',
        inputPadding: '10px 15px',
      },
      fontSizes: {
        baseBodySize: '14px',
        baseInputSize: '14px',
        baseLabelSize: '14px',
        baseButtonSize: '14px',
      },
      fonts: {
        bodyFontFamily: 'inherit',
        buttonFontFamily: 'inherit',
        inputFontFamily: 'inherit',
        labelFontFamily: 'inherit',
      },
      borderWidths: {
        buttonBorderWidth: '1px',
        inputBorderWidth: '1px',
      },
      radii: {
        borderRadiusButton: 'var(--radius)',
        buttonBorderRadius: 'var(--radius)',
        inputBorderRadius: 'var(--radius)',
      },
    },
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-15rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <UtensilsCrossed className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">
            {view === 'login' ? 'Welcome Back' : 'Create an Account'}
          </CardTitle>
          <CardDescription>
            {view === 'login' ? 'Sign in to access your dashboard.' : 'Enter your details to get started.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            view={view}
            appearance={{ theme: customTheme }}
            theme={theme === 'dark' ? 'dark' : 'default'}
            showLinks={true}
            providers={['google', 'github']}
            redirectTo={getURL()}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Create a password',
                  button_label: 'Sign up',
                  social_provider_text: 'Continue with {{provider}}',
                  link_text: "Already have an account? Sign in",
                },
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Your password',
                  button_label: 'Sign in',
                  social_provider_text: 'Continue with {{provider}}',
                  link_text: "Don't have an account? Sign up",
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
