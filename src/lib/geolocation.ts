// Geolocation utilities

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationError {
  code: number;
  message: string;
}

export class GeolocationError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = 'GeolocationError';
  }
}

export const getCurrentPosition = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new GeolocationError('Geolocation is not supported by this browser', 0));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        let message = 'Unknown error occurred';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out';
            break;
        }
        reject(new GeolocationError(message, error.code));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

export const calculateDistance = (
  point1: Coordinates,
  point2: Coordinates
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) *
    Math.cos(toRadians(point2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

export const isWithinRadius = (
  center: Coordinates,
  point: Coordinates,
  radiusKm: number
): boolean => {
  const distance = calculateDistance(center, point);
  return distance <= radiusKm;
};

// Geocoding utilities (would integrate with a service like Google Maps API)
export const geocodeAddress = async (address: string): Promise<Coordinates> => {
  // This is a mock implementation
  // In a real app, you'd integrate with Google Maps Geocoding API or similar
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock coordinates for demo
  return {
    lat: 51.505 + (Math.random() - 0.5) * 0.1,
    lng: -0.09 + (Math.random() - 0.5) * 0.1,
  };
};

export const reverseGeocode = async (coordinates: Coordinates): Promise<string> => {
  // This is a mock implementation
  // In a real app, you'd integrate with Google Maps Geocoding API or similar
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock address for demo
  const addresses = [
    '123 Main St, Toronto, ON',
    '456 Oak Ave, Vancouver, BC',
    '789 Pine St, Montreal, QC',
    '321 Elm Dr, Calgary, AB',
  ];
  
  const randomIndex = Math.floor(Math.random() * addresses.length);
  const selectedAddress = addresses[randomIndex];
  if (selectedAddress) {
    return selectedAddress;
  }
  // Fallback to first address (this should never happen with a non-empty array)
  return addresses[0]!;
};