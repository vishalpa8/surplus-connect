import * as listingMock from './listingService.mock'
import * as listingReal from './listingService'
import * as profileMock from './profileService.mock'
import * as profileReal from './profileService'
import * as reservationMock from './reservationService.mock'
import * as reservationReal from './reservationService'
import * as notificationMock from './notificationService.mock'
import * as notificationReal from './notificationService'
import * as analyticsMock from './analyticsService.mock'
import * as analyticsReal from './analyticsService'

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

export const {
  fetchListingsForVendor,
  fetchAvailableListings,
  addListing,
  updateListing,
  deleteListing,
} = useMock ? listingMock : listingReal

export const { fetchProfile } = useMock ? profileMock : profileReal
export const {
  fetchReservationsForUser,
  addReservation,
} = useMock ? reservationMock : reservationReal
export const {
  fetchNotifications,
  markAsRead,
} = useMock ? notificationMock : notificationReal
export const {
  fetchEvents,
  addEvent,
} = useMock ? analyticsMock : analyticsReal
