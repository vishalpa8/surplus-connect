'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error-100">
            <AlertTriangle className="h-8 w-8 text-error-600" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p className="mb-6 max-w-md text-gray-600">
            We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-6 max-w-lg">
              <summary className="cursor-pointer text-sm text-gray-500">
                Error details (development only)
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-left text-xs">
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <Button onClick={this.handleReset} leftIcon={<RefreshCw className="h-4 w-4" />}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}