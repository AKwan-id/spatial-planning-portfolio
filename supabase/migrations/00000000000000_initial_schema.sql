-- Migration: Initial Schema & Security for Portfolio

-- 1. Create admin_users table for authorization
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- 2. Create tables for Portfolio content
CREATE TABLE public.portfolio_data (
  id integer PRIMARY KEY DEFAULT 1,
  content jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.public_portfolio_data (
  id integer PRIMARY KEY DEFAULT 1,
  content jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_portfolio_data ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for admin_users
-- Admins can read the admin list
CREATE POLICY "Admins can view admin list" ON public.admin_users
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- Admins can add or remove admins
CREATE POLICY "Admins can manage admins" ON public.admin_users
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- 5. RLS Policies for portfolio_data (Drafts & Originals)
-- Only admins can read/write the original data
CREATE POLICY "Admins can manage full portfolio data" ON public.portfolio_data
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- 6. RLS Policies for public_portfolio_data (Published)
-- Anyone can read
CREATE POLICY "Anyone can view published portfolio data" ON public.public_portfolio_data
  FOR SELECT USING (true);

-- Only admins can write
CREATE POLICY "Admins can update published data" ON public.public_portfolio_data
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));
