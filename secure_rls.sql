-- Supabase RLS Security Fixes for Annisa Portfolio
-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. Enable RLS for all critical tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 2. Allow PUBLIC READ access strictly ONLY IF status IS PUBLISHED
-- This forces the database to reject public queries for Draft documents natively!
CREATE POLICY "Allow public read access for published projects" ON projects FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Allow public read access for published skills" ON skills FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Allow public read access for published experience" ON experience FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Allow public read access for published certificates" ON certificates FOR SELECT USING (status = 'PUBLISHED');

-- 3. Allow ADMIN ONLY for Insert, Update, Delete
-- Assuming you already created the admin_users table for owner auth earlier
CREATE POLICY "Allow admin full access projects" ON projects USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));
CREATE POLICY "Allow admin full access skills" ON skills USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));
CREATE POLICY "Allow admin full access experience" ON experience USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));
CREATE POLICY "Allow admin full access certificates" ON certificates USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));
