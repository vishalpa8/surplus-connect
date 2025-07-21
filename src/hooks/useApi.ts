'use client';

import { useState, useEffect, useCallback } from 'react';
import { mockApi, ApiError } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = [],
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiFunction();
      setState({ data, loading: false, error: null });
      onSuccess?.(data);
      return data;
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError('Unknown error', 0);
      setState({ data: null, loading: false, error: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [apiFunction, onSuccess, onError, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
  // NOTE: Using spread in dependency array disables static analysis for exhaustive-deps. Ensure dependencies are correct.

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const refetch = useCallback(() => execute(), [execute]);

  return { ...state, execute, refetch };
}

// Specific hooks for common API operations
export function useListings(filters?: any) {
  return useApi(() => mockApi.getListings(filters), [filters]);
}

export function useVendorAnalytics() {
  return useApi(() => mockApi.getVendorAnalytics());
}

export function useConsumerAnalytics() {
  return useApi(() => mockApi.getConsumerAnalytics());
}

export function useProfile() {
  return useApi(() => mockApi.getProfile());
}

// Mutation hooks
export function useCreateListing() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const createListing = useCallback(async (listingData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await mockApi.createListing(listingData);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError('Failed to create listing', 0);
      setState({ data: null, loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, createListing };
}

export function useUpdateListing() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const updateListing = useCallback(async (id: string, listingData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await mockApi.updateListing(id, listingData);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError('Failed to update listing', 0);
      setState({ data: null, loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, updateListing };
}

export function useUpdateProfile() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const updateProfile = useCallback(async (profileData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await mockApi.updateProfile(profileData);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError('Failed to update profile', 0);
      setState({ data: null, loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, updateProfile };
}