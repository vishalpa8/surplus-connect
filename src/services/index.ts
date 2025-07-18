// Central export for services. Switch between mock and real implementations here.

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

export * from './listingService.mock'
export * from './profileService.mock'
export * from './reservationService.mock'
export * from './notificationService.mock'
export * from './analyticsService.mock'

// In future, replace the above exports with real services when useMock is false.
// Example:
// export * from useMock ? './listingService.mock' : './listingService'
