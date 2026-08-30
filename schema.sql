-- =========================================================
-- AETHER SYNERGY DATABASE SCHEMA (POSTGRESQL / SUPABASE)
-- Multi-tier AI 3D Fashion, Interior Design & B2B Manufacturing
-- =========================================================

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('guest', 'free', 'pro', 'agency', 'admin');
CREATE TYPE design_niche AS ENUM ('fashion_streetwear', 'interior_design', 'instrumentation_hardware', 'agency_marketing');
CREATE TYPE company_role AS ENUM ('founder_ceo', 'creative_director', 'indie_designer', 'sourcing_lead', 'agency_partner');
CREATE TYPE production_volume AS ENUM ('1_5_monthly', '6_20_monthly', '20_plus_monthly', 'exploring');
CREATE TYPE registration_type AS ENUM ('basic', 'complete');
CREATE TYPE account_status AS ENUM ('active', 'suspended', 'pending_verification');

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role user_role DEFAULT 'free' NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. PROFILES & BRAND INFO TABLE (REGISTRO COMPLETO)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    brand_or_studio_name VARCHAR(255),
    niche design_niche DEFAULT 'fashion_streetwear' NOT NULL,
    country VARCHAR(100) DEFAULT 'Global',
    phone VARCHAR(50),
    company_role company_role DEFAULT 'indie_designer',
    estimated_volume production_volume DEFAULT '1_5_monthly',
    registration_type registration_type DEFAULT 'complete' NOT NULL,
    terms_accepted BOOLEAN DEFAULT true NOT NULL,
    marketing_consent BOOLEAN DEFAULT false,
    status account_status DEFAULT 'active' NOT NULL
);

-- 4. SUBSCRIPTIONS & CREDITS TABLE
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    plan_name VARCHAR(100) DEFAULT 'Free Starter' NOT NULL,
    plan_price NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    billing_cycle VARCHAR(20) DEFAULT 'monthly',
    ai_credits_total INTEGER DEFAULT 3 NOT NULL,
    ai_credits_used INTEGER DEFAULT 0 NOT NULL,
    licenses_count INTEGER DEFAULT 1 NOT NULL,
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_period_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 month')
);

-- 5. 3D PROJECTS & TECH PACKS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category design_niche DEFAULT 'fashion_streetwear' NOT NULL,
    mesh_glb_url TEXT,
    techpack_zip_url TEXT,
    estimated_cost_usd NUMERIC(10, 2),
    target_supplier_hub VARCHAR(100),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_profiles_niche ON profiles(niche);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
