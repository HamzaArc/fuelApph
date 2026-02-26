-- Migration: Create price_reports table and update RLS policies
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/vbhfdctcvgzrjrcqedcg/sql/new

-- 1. Create price_reports table for audit trail
CREATE TABLE IF NOT EXISTS price_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    station_id UUID REFERENCES stations(id) ON DELETE CASCADE,
    fuel_type TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    report_type TEXT NOT NULL DEFAULT 'manual',
    points_earned INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE price_reports ENABLE ROW LEVEL SECURITY;

-- 2. RLS for price_reports
CREATE POLICY "Users can insert own reports" ON price_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own reports" ON price_reports FOR SELECT
  USING (auth.uid() = user_id);

-- 3. Stations: any authenticated user can update prices
CREATE POLICY "Authenticated users can update stations" ON stations FOR UPDATE
  USING (true) WITH CHECK (true);

-- 4. Stations: any authenticated user can insert new stations
CREATE POLICY "Authenticated users can insert stations" ON stations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 5. Users: all users can read all profiles (for leaderboard)
DROP POLICY IF EXISTS "Users can manage own profile" ON users;

CREATE POLICY "Users are publicly readable" ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile" ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users FOR UPDATE
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
