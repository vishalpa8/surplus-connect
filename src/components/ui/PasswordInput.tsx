'use client';

import { forwardRef, useState, InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string | undefined;
  hint?: string;
  fullWidth?: boolean;
  showStrengthIndicator?: boolean;
}

const getPasswordStrength = (password: string): { score: number; text: string; color: string } => {
  if (!password) return { score: 0, text: '', color: '' };
  
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const strength = {
    0: { text: '', color: '' },
    1: { text: 'Very Weak', color: 'bg-red-500' },
    2: { text: 'Weak', color: 'bg-orange-500' },
    3: { text: 'Fair', color: 'bg-yellow-500' },
    4: { text: 'Good', color: 'bg-blue-500' },
    5: { text: 'Strong', color: 'bg-green-500' },
  }[score] || { text: '', color: '' };

  return { score, ...strength };
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, hint, fullWidth = true, showStrengthIndicator = false, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const strength = showStrengthIndicator ? getPasswordStrength(value as string || '') : null;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="form-label">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            value={value}
            className={cn(
              'form-input pr-10',
              error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {showStrengthIndicator && value && strength && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn('h-full transition-all duration-300', strength.color)}
                  style={{ width: `${(strength.score / 5) * 100}%` }}
                />
              </div>
              {strength.text && (
                <span className="text-xs font-medium text-gray-600">
                  {strength.text}
                </span>
              )}
            </div>
          </div>
        )}
        
        {hint && !error && (
          <p className="form-hint">
            {hint}
          </p>
        )}
        {error && (
          <p className="form-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';