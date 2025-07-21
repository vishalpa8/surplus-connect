// Environment configuration and validation

interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string | undefined;
  NEXT_PUBLIC_SENTRY_DSN?: string | undefined;
  NEXT_PUBLIC_ANALYTICS_ID?: string | undefined;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value;
};

const getOptionalEnvVar = (key: string, defaultValue?: string): string | undefined => {
  return process.env[key] || defaultValue;
};

export const env: EnvironmentConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvironmentConfig['NODE_ENV']) || 'development',
  NEXT_PUBLIC_APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  NEXT_PUBLIC_API_URL: getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api'),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: getOptionalEnvVar('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'),
  NEXT_PUBLIC_SENTRY_DSN: getOptionalEnvVar('NEXT_PUBLIC_SENTRY_DSN'),
  NEXT_PUBLIC_ANALYTICS_ID: getOptionalEnvVar('NEXT_PUBLIC_ANALYTICS_ID'),
};

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Feature flags
export const features = {
  enableAnalytics: isProduction && !!env.NEXT_PUBLIC_ANALYTICS_ID,
  enableErrorReporting: isProduction && !!env.NEXT_PUBLIC_SENTRY_DSN,
  enableMaps: !!env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  enablePerformanceMonitoring: true,
  enableAccessibilityChecks: isDevelopment,
} as const;