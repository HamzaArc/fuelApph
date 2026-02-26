-- 1. Create the Users Table (Links to auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    next_level_xp INTEGER DEFAULT 100,
    total_points INTEGER DEFAULT 0,
    reports_count INTEGER DEFAULT 0,
    verified_count INTEGER DEFAULT 0,
    savings DOUBLE PRECISION DEFAULT 0.0,
    global_rank INTEGER,
    role TEXT DEFAULT 'user',
    vehicle JSONB
);

-- 2. Create the Stations Table
CREATE TABLE stations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    location JSONB NOT NULL,
    prices JSONB,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    last_updated_timestamp BIGINT,
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_by_level INTEGER,
    distance TEXT,
    amenities TEXT[],
    status TEXT,
    trust_score INTEGER DEFAULT 0,
    is_ghost BOOLEAN DEFAULT FALSE
);

-- 3. Create the Achievements tables
CREATE TABLE achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE user_achievements (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id TEXT REFERENCES achievements(id) ON DELETE CASCADE,
    is_unlocked BOOLEAN DEFAULT FALSE,
    unlocked_date TIMESTAMPTZ,
    PRIMARY KEY (user_id, achievement_id)
);

-- 4. Create App Notifications Table
CREATE TABLE app_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    time TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- 5. Create Vouchers Table
CREATE TABLE vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    brand TEXT NOT NULL,
    value TEXT NOT NULL,
    type TEXT NOT NULL,
    points_required INTEGER NOT NULL,
    code TEXT NOT NULL,
    expiry_date TIMESTAMPTZ,
    is_used BOOLEAN DEFAULT FALSE
);

-- 6. Create Log Entries Table
CREATE TABLE log_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMPTZ DEFAULT NOW(),
    station_name TEXT NOT NULL,
    cost DOUBLE PRECISION,
    volume DOUBLE PRECISION,
    odometer INTEGER
);

-- --------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) SETUP
-- --------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE log_entries ENABLE ROW LEVEL SECURITY;

-- Stations: Globally readable by everyone
CREATE POLICY "Stations are globally readable" ON stations FOR SELECT USING (true);

-- Stations: Authenticated users can insert
CREATE POLICY "Authenticated users can insert stations" ON stations FOR INSERT TO authenticated WITH CHECK (true);

-- Stations: Authenticated users can update
CREATE POLICY "Authenticated users can update stations" ON stations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Price Reports: Users can manage own records
CREATE POLICY "Users can manage own price reports" ON price_reports FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Users: Read/Insert/Update their own profile
CREATE POLICY "Users can manage own profile" ON users FOR ALL USING (auth.uid() = id);

-- User Achievements: Read/Update own records
CREATE POLICY "Users can manage own achievements" ON user_achievements FOR ALL USING (auth.uid() = user_id);

-- Notifications: Read/Update own records
CREATE POLICY "Users can manage own notifications" ON app_notifications FOR ALL USING (auth.uid() = user_id);

-- Vouchers: Read/Update own records
CREATE POLICY "Users can manage own vouchers" ON vouchers FOR ALL USING (auth.uid() = user_id);

-- Log Entries: Read/Insert/Update own records
CREATE POLICY "Users can manage own log entries" ON log_entries FOR ALL USING (auth.uid() = user_id);

-- Auth Trigger (Optional but recommended): Automatically insert into public.users when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
