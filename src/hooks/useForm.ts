'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';

interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: z.ZodObject<any>;
  onSubmit?: (values: T) => Promise<void> | void;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  });

  const validateField = useCallback(
    (name: keyof T, value: any): string | undefined => {
      if (!validationSchema) return undefined;

      try {
        // Create a partial schema for the specific field
        const fieldSchema = validationSchema.pick({ [name]: true } as any);
        fieldSchema.parse({ [name]: value });
        return undefined;
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors[0]?.message;
        }
        return 'Invalid value';
      }
    },
    [validationSchema]
  );

  const validateForm = useCallback(
    (values: T): Partial<Record<keyof T, string>> => {
      if (!validationSchema) return {};

      try {
        validationSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Partial<Record<keyof T, string>> = {};
          error.errors.forEach((err) => {
            if (err.path.length > 0) {
              const field = err.path[0] as keyof T;
              errors[field] = err.message;
            }
          });
          return errors;
        }
        return {};
      }
    },
    [validationSchema]
  );

  const setValue = useCallback((name: keyof T, value: any) => {
    setState((prev) => {
      const newValues = { ...prev.values, [name]: value };
      const fieldError = validateField(name, value);
      const newErrors = { ...prev.errors };
      
      if (fieldError) {
        newErrors[name] = fieldError;
      } else {
        delete newErrors[name];
      }

      const isValid = Object.keys(newErrors).length === 0;

      return {
        ...prev,
        values: newValues,
        errors: newErrors,
        isValid,
      };
    });
  }, [validateField]);

  const setFieldTouched = useCallback((name: keyof T, touched = true) => {
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: touched },
    }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: error },
      isValid: false,
    }));
  }, []);

  const clearFieldError = useCallback((name: keyof T) => {
    setState((prev) => {
      const newErrors = { ...prev.errors };
      delete newErrors[name];
      const isValid = Object.keys(newErrors).length === 0;
      
      return {
        ...prev,
        errors: newErrors,
        isValid,
      };
    });
  }, []);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      setState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        const errors = validateForm(state.values);
        
        if (Object.keys(errors).length > 0) {
          setState((prev) => ({
            ...prev,
            errors,
            isSubmitting: false,
            isValid: false,
          }));
          return;
        }

        if (onSubmit) {
          await onSubmit(state.values);
        }

        setState((prev) => ({ ...prev, isSubmitting: false }));
      } catch (error) {
        setState((prev) => ({ ...prev, isSubmitting: false }));
        throw error;
      }
    },
    [state.values, validateForm, onSubmit]
  );

  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
    });
  }, [initialValues]);

  const setValues = useCallback((values: Partial<T>) => {
    setState((prev) => {
      const newValues = { ...prev.values, ...values };
      const errors = validateForm(newValues);
      const isValid = Object.keys(errors).length === 0;

      return {
        ...prev,
        values: newValues,
        errors,
        isValid,
      };
    });
  }, [validateForm]);

  const getFieldProps = useCallback(
    (name: keyof T) => ({
      name: name as string,
      value: state.values[name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValue(name, e.target.value);
      },
      onBlur: () => {
        setFieldTouched(name, true);
      },
      error: state.touched[name] ? state.errors[name] : undefined,
    }),
    [state.values, state.errors, state.touched, setValue, setFieldTouched]
  );

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    setValue,
    setFieldTouched,
    setFieldError,
    clearFieldError,
    setValues,
    handleSubmit,
    reset,
    getFieldProps,
  };
}