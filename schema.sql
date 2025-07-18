-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(50) CHECK (role IN ('vendor', 'consumer', 'ngo')),
  name VARCHAR(255),
  avatar_url VARCHAR(255),
  meals_saved INT DEFAULT 0,
  badge_id INT REFERENCES public.badges(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BADGES TABLE
CREATE TABLE IF NOT EXISTS public.badges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  icon_url VARCHAR(255),
  threshold INT NOT NULL -- e.g., 10, 50, 100 meals
);

-- LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.listings (
  id SERIAL PRIMARY KEY,
  vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity VARCHAR(100),
  expiry_time TIMESTAMPTZ NOT NULL,
  pickup_window_start TIMESTAMPTZ NOT NULL,
  pickup_window_end TIMESTAMPTZ NOT NULL,
  image_url VARCHAR(255),
  location GEOGRAPHY(POINT, 4326),
  status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GEOGRAPHY INDEX for location-based queries
CREATE INDEX IF NOT EXISTS listings_location_idx ON public.listings USING GIST(location);

-- RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.reservations (
  id SERIAL PRIMARY KEY,
  listing_id INT REFERENCES public.listings(id) ON DELETE CASCADE,
  consumer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- e.g., 'listing_nearby', 'reservation', 'badge'
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ANALYTICS/EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.analytics (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'listing_created', 'reservation_completed', etc.
  meta JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES (same as your original, with extra for notifications/analytics)
-- Add as needed (for brevity, reuse your policies, add these as examples):

-- Notifications: Only the user can see their notifications
CREATE POLICY "Users can view their own notifications."
  ON public.notifications FOR SELECT USING (auth.uid() = user_id);

-- Analytics: Only the user can see their own analytics
CREATE POLICY "Users can view their own analytics."
  ON public.analytics FOR SELECT USING (auth.uid() = user_id);

-- Badges: Anyone can read badges (for displaying them in UI)
CREATE POLICY "Badges are viewable by everyone."
  ON public.badges FOR SELECT USING (true);

-- Automated Badge Assignment Logic
CREATE OR REPLACE FUNCTION public.assign_badge()
RETURNS TRIGGER AS $$
DECLARE
  new_badge_id INT;
BEGIN
  SELECT id INTO new_badge_id
    FROM public.badges
    WHERE threshold <= NEW.meals_saved
    ORDER BY threshold DESC
    LIMIT 1;

  IF new_badge_id IS NOT NULL AND (NEW.badge_id IS DISTINCT FROM new_badge_id) THEN
    UPDATE public.profiles SET badge_id = new_badge_id WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-assign badges on meals_saved update
CREATE TRIGGER on_meals_saved_update
AFTER UPDATE OF meals_saved ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.assign_badge();

-- Function to update meals_saved AND fire events
CREATE OR REPLACE FUNCTION public.update_meals_saved()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Update vendor
    UPDATE public.profiles
    SET meals_saved = meals_saved + 1
    WHERE id = (SELECT vendor_id FROM public.listings WHERE id = NEW.listing_id);

    -- Update consumer
    UPDATE public.profiles
    SET meals_saved = meals_saved + 1
    WHERE id = NEW.consumer_id;

    -- Log analytics for both
    INSERT INTO public.analytics(user_id, event_type, meta)
      VALUES ((SELECT vendor_id FROM public.listings WHERE id = NEW.listing_id), 'meal_saved', jsonb_build_object('listing_id', NEW.listing_id)),
             (NEW.consumer_id, 'meal_saved', jsonb_build_object('listing_id', NEW.listing_id));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for reservations (replaces your original)
DROP TRIGGER IF EXISTS on_reservation_complete ON public.reservations;
CREATE TRIGGER on_reservation_complete
AFTER UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_meals_saved();

-- Automatic Listing Expiry (can use cron job or Supabase scheduled function; for now, a helper function)
CREATE OR REPLACE FUNCTION public.expire_listings()
RETURNS void AS $$
BEGIN
  UPDATE public.listings
  SET status = 'expired'
  WHERE expiry_time < NOW() AND status != 'expired';
END;
$$ LANGUAGE plpgsql;

-- (Set up scheduled call for expire_listings using pg_cron, or call from backend as a cron job)

-- Example Seed Data
INSERT INTO public.badges (name, description, icon_url, threshold) VALUES
  ('Bronze Saver', 'Saved 10+ meals', '/assets/badges/bronze.png', 10),
  ('Silver Saver', 'Saved 50+ meals', '/assets/badges/silver.png', 50),
  ('Gold Saver', 'Saved 100+ meals', '/assets/badges/gold.png', 100);

-- You can add other INSERT statements for profiles, listings, etc., as needed.
