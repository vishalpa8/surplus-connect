// Comprehensive error handling system

export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN',
}

export interface ErrorDetails {
  type: ErrorType;
  message: string;
  code?: string | number;
  details?: any;
  timestamp: Date;
  userAgent?: string;
  url?: string;
  userId?: string;
}

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly code: string | number | undefined;
  public readonly details?: any;
  public readonly timestamp: Date;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    code?: string | number,
    details?: any,
    isOperational = true
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  toJSON(): ErrorDetails {
    return {
      type: this.type,
      message: this.message,
      code: this.code ?? 'UNKNOWN',
      details: this.details,
      timestamp: this.timestamp,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
  }
}

// Specific error classes
export class NetworkError extends AppError {
  constructor(message = 'Network error occurred', code?: number, details?: any) {
    super(message, ErrorType.NETWORK, code, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: any) {
    super(message, ErrorType.VALIDATION, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed', code?: string) {
    super(message, ErrorType.AUTHENTICATION, code);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Access denied', code?: string) {
    super(message, ErrorType.AUTHORIZATION, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', resource?: string) {
    super(message, ErrorType.NOT_FOUND, 'NOT_FOUND', { resource });
  }
}

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorListeners: ((error: AppError) => void)[] = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  addErrorListener(listener: (error: AppError) => void): void {
    this.errorListeners.push(listener);
  }

  removeErrorListener(listener: (error: AppError) => void): void {
    const index = this.errorListeners.indexOf(listener);
    if (index > -1) {
      this.errorListeners.splice(index, 1);
    }
  }

  handleError(error: Error | AppError): void {
    const appError = error instanceof AppError ? error : this.convertToAppError(error);
    
    // Log error
    this.logError(appError);
    
    // Notify listeners
    this.errorListeners.forEach(listener => {
      try {
        listener(appError);
      } catch (listenerError) {
        console.error('Error in error listener:', listenerError);
      }
    });

    // Report to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportError(appError);
    }
  }

  private convertToAppError(error: Error): AppError {
    // Convert common errors to AppError
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return new NetworkError('Network request failed', undefined, { originalError: error.message });
    }

    if (error.name === 'SyntaxError') {
      return new AppError('Invalid data format', ErrorType.CLIENT, 'SYNTAX_ERROR', { originalError: error.message });
    }

    return new AppError(
      error.message || 'An unexpected error occurred',
      ErrorType.UNKNOWN,
      undefined,
      { originalError: error.message, stack: error.stack }
    );
  }

  private logError(error: AppError): void {
    const errorInfo = {
      ...error.toJSON(),
      stack: error.stack,
    };

    if (error.type === ErrorType.NETWORK || error.type === ErrorType.SERVER) {
      console.error('🔴 Critical Error:', errorInfo);
    } else if (error.type === ErrorType.VALIDATION) {
      console.warn('🟡 Validation Error:', errorInfo);
    } else {
      console.error('❌ Error:', errorInfo);
    }
  }

  private async reportError(error: AppError): Promise<void> {
    try {
      // In a real app, send to error reporting service like Sentry, LogRocket, etc.
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(error.toJSON()),
      // });
      
      console.log('Error reported to monitoring service:', error.toJSON());
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }
}

// Global error handlers
export const setupGlobalErrorHandlers = (): void => {
  const errorHandler = ErrorHandler.getInstance();

  // Handle unhandled promise rejections
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason));
      
      errorHandler.handleError(error);
      event.preventDefault(); // Prevent the default browser behavior
    });

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      const error = event.error || new Error(event.message);
      errorHandler.handleError(error);
    });
  }
};

// Error boundary helpers
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

export const getErrorType = (error: unknown): ErrorType => {
  if (error instanceof AppError) {
    return error.type;
  }
  
  return ErrorType.UNKNOWN;
};

// Retry utilities
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }

  throw lastError!;
};

// Circuit breaker pattern
export class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private maxFailures = 5,
    private timeout = 60000 // 1 minute
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new AppError('Circuit breaker is OPEN', ErrorType.SERVER, 'CIRCUIT_BREAKER_OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.maxFailures) {
      this.state = 'OPEN';
    }
  }

  getState(): string {
    return this.state;
  }
}