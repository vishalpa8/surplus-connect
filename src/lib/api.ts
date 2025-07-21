// API utility functions for future backend integration

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface ApiErrorResponse {
  error: string;
  message: string;
  success: false;
  code?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        throw new ApiError(
          errorData.message || 'An error occurred',
          response.status,
          errorData.code
        );
      }

      return (data as ApiResponse<T>).data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 0);
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();

// Mock data functions for development
export const mockApi = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // This would be replaced with actual API call
    return { token: 'mock-token', user: { id: '1', email, name: 'Mock User' } };
  },

  register: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { token: 'mock-token', user: { id: '1', ...userData } };
  },

  // Listings endpoints
  getListings: async (filters?: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      {
        id: '1',
        title: 'Fresh Croissants',
        vendor: 'Bakery Delights',
        category: 'Bakery',
        originalPrice: 12.99,
        discountedPrice: 6.99,
        quantity: 10,
        expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        location: { lat: 51.505, lng: -0.09 },
        address: '123 Main St, London',
        imageUrl: '/images/food/croissant.svg',
        description: 'Delicious, buttery croissants baked fresh this morning.',
        dietaryInfo: ['Vegetarian'],
        allergens: ['Contains Gluten', 'Contains Dairy'],
      },
      // Add more mock listings...
    ];
  },

  createListing: async (listingData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { id: Date.now().toString(), ...listingData };
  },

  updateListing: async (id: string, listingData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id, ...listingData };
  },

  deleteListing: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  },

  // User endpoints
  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'consumer',
      phone: '+1234567890',
      address: '123 Main St',
      city: 'Toronto',
      postalCode: 'M5V 3A8',
    };
  },

  updateProfile: async (profileData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...profileData };
  },

  // Analytics endpoints
  getVendorAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      totalListings: 45,
      activeListing: 12,
      totalRevenue: 3247,
      mealsSaved: 2543,
      impactScore: 92,
      revenueData: [
        { month: 'Jan', revenue: 2400 },
        { month: 'Feb', revenue: 1398 },
        { month: 'Mar', revenue: 9800 },
        { month: 'Apr', revenue: 3908 },
        { month: 'May', revenue: 4800 },
        { month: 'Jun', revenue: 3800 },
      ],
    };
  },

  getConsumerAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      mealsSaved: 42,
      moneySaved: 127,
      activeReservations: 3,
      impactScore: 85,
      impactData: [
        { month: 'Jan', meals: 12 },
        { month: 'Feb', meals: 8 },
        { month: 'Mar', meals: 15 },
        { month: 'Apr', meals: 18 },
        { month: 'May', meals: 22 },
        { month: 'Jun', meals: 25 },
      ],
    };
  },
};