export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold text-center mb-8">Authentication Error</h1>
      <p className="text-center text-muted-foreground">
        There was an error during the authentication process. Please try again.
      </p>
    </div>
  )
}
