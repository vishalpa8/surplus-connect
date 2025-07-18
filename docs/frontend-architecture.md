# Surplus Connect Frontend Architecture

This document describes the recommended folder structure and key design principles for a production-ready Surplus Connect frontend built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Folder Structure

```
src/
├─ app/                # Next.js app router pages and routes
│  ├─ (auth)/          # Login/signup/reset flows
│  ├─ dashboard/       # User, vendor and NGO dashboards
│  ├─ contact/         # Contact form page
│  └─ ...              # Additional pages (about, pricing, map)
├─ components/
│  ├─ ui/              # Reusable UI components from shadcn
│  ├─ shared/          # Navbar, Footer, Map, ThemeToggle
│  └─ dashboard/       # Dashboard specific widgets and forms
├─ lib/                # Helper libraries (Supabase client, utilities)
├─ services/           # Data fetching logic.  Automatically switches
│                       between `*.mock.ts` and real implementations
│                       based on `NEXT_PUBLIC_USE_MOCK_DATA` flag.
├─ types/              # Generated database and shared types
└─ data/               # Mock data used by tests or demos
```

## Component Guidelines

- **Mobile First & Responsive**: All components should use fluid layouts (`flex`, `grid`) and Tailwind breakpoints.
- **Accessibility**: Provide labels, use semantic HTML and ARIA attributes. Keyboard navigation must be tested.
- **Dark Mode**: `next-themes` handles theme switching. Tailwind's `dark:` variants define styles.
- **Reusability**: Build small components (e.g. `Button`, `Card`, `Modal`) under `components/ui` and compose them in pages.

## Navigation Flow

1. **Home** – Mission statement and call to action.
2. **Auth** – Register or login. Demo users are pre-populated for quick testing.
3. **Dashboard** – Loaded based on the user role (`vendor`, `consumer`, `ngo`).
   - Vendors manage listings and view analytics.
   - Consumers/NGOs browse reservations and see stats.
4. **Map** – Interactive map of available listings. Users can reserve items.
5. **Contact** – Simple form that posts to `/api/contact`.

The `Navbar` shows relevant links once a user is logged in and adapts for mobile using a Radix UI `Sheet`.

## Extension Points

- **Services**: Each file in `src/services` exports typed functions. When ready to connect a real backend, implement the matching functions in `*.ts` and remove the `NEXT_PUBLIC_USE_MOCK_DATA` flag.
- **Analytics**: `analyticsService.*` demonstrates how events could be tracked.
- **Payments**: Future Stripe integration can live under `src/services/paymentService.ts`.

## Example: Listing Service (Mock)

```ts
// src/services/listingService.mock.ts
import { Database } from '@/types/database.types'
export type Listing = Database['public']['Tables']['listings']['Row']

let listings: Listing[] = [
  {
    id: 1,
    vendor_id: 'vendor1',
    name: 'Leftover Pizza Slices',
    description: "Assorted slices from today's batches.",
    quantity: '8',
    expiry_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    pickup_window_start: new Date().toISOString(),
    pickup_window_end: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    image_url: null,
    location: 'POINT(77.5946 12.9716)',
    status: 'available',
    created_at: new Date().toISOString(),
  },
]

export async function fetchAvailableListings() {
  return listings
}
```

Real implementations live in `listingService.ts` and talk to Supabase. The loader in `src/services/index.ts` exports either version at runtime.

## Keeping Code DRY and Testable

- Centralise API calls in the `services` directory.
- Use React hooks (`useEffect`, `useState`) only in components and keep them lean.
- Type all data structures with the generated database types.
- Mock services return promises to simulate async behaviour, enabling frontend unit tests with tools like React Testing Library.

## UI/UX Libraries Used

- **Next.js** – App Router for file based routing and server components.
- **Tailwind CSS** – Utility-first styling with design tokens.
- **shadcn/ui** – Accessible React components built on Radix UI.
- **React Leaflet** – Map rendering over OpenStreetMap tiles.
- **next-themes** – Light/dark mode with system preference detection.
- **Supabase JS** – Browser client for authentication and database access.

These tools keep the codebase minimal yet powerful, allowing quick iteration and consistent design across the application.

## Example: Listing Card Component

```tsx
// src/components/shared/ListingCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface ListingCardProps {
  title: string
  quantity: number
  status: 'available' | 'reserved' | 'collected'
  onReserve?: () => void
}

export default function ListingCard({ title, quantity, status, onReserve }: ListingCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Quantity: {quantity}</p>
        <Badge variant={status === 'available' ? 'default' : status === 'reserved' ? 'secondary' : 'outline'}>
          {status}
        </Badge>
        {status === 'available' && onReserve && (
          <button onClick={onReserve} className="w-full mt-4 bg-primary text-primary-foreground py-1 rounded">
            Reserve
          </button>
        )}
      </CardContent>
    </Card>
  )
}
```

## Navigation by User Role

1. **Vendors** – After login they see `/dashboard` with the vendor dashboard. Here they can add listings, edit them and monitor reservations.
2. **Consumers & NGOs** – Login redirects to the same `/dashboard` route but loads the consumer/NGO dashboard showing reservations and a link to the map.
3. **Admins** – Redirected to `/admin` where moderation tools and analytics would live.

The main `Navbar` detects the role from the user profile (stored in Supabase or mock storage) and only shows links relevant to that role.

## Keeping Things Scalable

- Reuse UI components from `src/components/ui` and extend them when needed.
- Keep business logic in the `services` layer so pages remain focused on rendering.
- Use environment variables like `NEXT_PUBLIC_USE_MOCK_DATA` to switch between mock data and real APIs without code changes.
- Type everything with the generated database types to avoid runtime errors and enable IDE autocomplete.

---
