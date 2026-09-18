-- ==========================================================
-- VERVE STUDIO - PRODUCTION POSTGRESQL / SUPABASE SCHEMA
-- "Make your child the hero of their own story."
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'editor', 'printer')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CHILDREN (Child Profiles)
CREATE TABLE IF NOT EXISTS children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    nickname VARCHAR(100),
    birth_date DATE,
    approximate_age INT NOT NULL,
    gender VARCHAR(20) DEFAULT 'neutral',
    favorite_color VARCHAR(50),
    favorite_animal VARCHAR(50),
    favorite_activity VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CHARACTERS (Reusable Character Identity)
CREATE TABLE IF NOT EXISTS characters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    character_name VARCHAR(100) NOT NULL,
    preferred_style VARCHAR(50) DEFAULT 'Classic Storybook',
    character_illustration_url TEXT,
    visual_characteristics JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. CHARACTER REFERENCES (Private uploaded photos)
CREATE TABLE IF NOT EXISTS character_references (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
    encrypted_storage_path TEXT NOT NULL,
    file_mime_type VARCHAR(50),
    file_size_bytes BIGINT,
    has_parental_consent BOOLEAN DEFAULT TRUE,
    auto_delete_at TIMESTAMP WITH TIME ZONE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. STORIES (Story Catalog)
CREATE TABLE IF NOT EXISTS stories (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(120) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    cover_image_url TEXT,
    age_range VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    page_count INT DEFAULT 24,
    languages TEXT[] DEFAULT ARRAY['English'],
    formats TEXT[] DEFAULT ARRAY['digital', 'paperback', 'hardcover'],
    moral_objective TEXT,
    benefits TEXT[],
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. STORY PAGES (Master Page Templates)
CREATE TABLE IF NOT EXISTS story_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_id VARCHAR(100) REFERENCES stories(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    scene_title VARCHAR(255),
    text_template TEXT NOT NULL,
    default_scene_image TEXT,
    character_role VARCHAR(100) DEFAULT 'protagonist',
    image_prompt_template TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (story_id, page_number)
);

-- 7. STORY TRANSLATIONS
CREATE TABLE IF NOT EXISTS story_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_page_id UUID REFERENCES story_pages(id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL,
    translated_template TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (story_page_id, language)
);

-- 8. PREVIEWS (Personalized Previews for Parents)
CREATE TABLE IF NOT EXISTS previews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_id VARCHAR(100) REFERENCES stories(id),
    character_id UUID REFERENCES characters(id),
    child_name VARCHAR(100) NOT NULL,
    child_age INT NOT NULL,
    language VARCHAR(50) DEFAULT 'English',
    character_style VARCHAR(50) DEFAULT 'Classic Storybook',
    personalized_cover_url TEXT,
    dedication_from TEXT,
    dedication_message TEXT,
    unlocked_page_count INT DEFAULT 4,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. GENERATION JOBS (AI Processing Queue)
CREATE TABLE IF NOT EXISTS generation_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    preview_id UUID REFERENCES previews(id) ON DELETE CASCADE,
    provider VARCHAR(50) DEFAULT 'gemini-imagen',
    status VARCHAR(50) DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
    current_stage VARCHAR(100),
    progress_percentage INT DEFAULT 0,
    retry_count INT DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. GENERATED PAGES
CREATE TABLE IF NOT EXISTS generated_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    preview_id UUID REFERENCES previews(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    personalized_text TEXT NOT NULL,
    image_storage_path TEXT NOT NULL,
    consistency_score NUMERIC(3, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. PRODUCTS & PRICING
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY, -- 'digital', 'paperback', 'hardcover'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_physical BOOLEAN DEFAULT FALSE,
    specs JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS product_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES products(id),
    currency VARCHAR(10) DEFAULT 'INR',
    amount NUMERIC(10, 2) NOT NULL,
    original_mrp NUMERIC(10, 2),
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP WITH TIME ZONE
);

-- 12. COUPONS
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed_amount')),
    discount_value NUMERIC(10, 2) NOT NULL,
    min_order_value NUMERIC(10, 2) DEFAULT 0,
    max_discount_limit NUMERIC(10, 2),
    usage_count INT DEFAULT 0,
    max_uses INT,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- 13. ORDERS
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'VRV-2026-9812'
    user_id UUID REFERENCES users(id),
    preview_id UUID REFERENCES previews(id),
    product_id VARCHAR(50) REFERENCES products(id),
    child_name VARCHAR(100) NOT NULL,
    story_title VARCHAR(255) NOT NULL,
    language VARCHAR(50) DEFAULT 'English',
    format VARCHAR(50) NOT NULL,
    quantity INT DEFAULT 1,
    subtotal_amount NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0,
    shipping_fee NUMERIC(10, 2) DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    order_status VARCHAR(50) DEFAULT 'Payment Received' CHECK (order_status IN (
        'Payment Received', 'Queued for Print', 'Printed', 'Shipped', 'Delivered', 'Ready for Download', 'Cancelled'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. PAYMENTS (Razorpay & Future Gateways)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    gateway VARCHAR(50) DEFAULT 'razorpay',
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    razorpay_signature TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'success',
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. SHIPPING ADDRESSES & SHIPMENTS
CREATE TABLE IF NOT EXISTS shipping_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    recipient_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    street_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    country VARCHAR(50) DEFAULT 'India'
);

CREATE TABLE IF NOT EXISTS shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    carrier VARCHAR(100) DEFAULT 'BlueDart / Delhivery',
    tracking_number VARCHAR(100),
    shipping_status VARCHAR(50) DEFAULT 'Label Created',
    shipped_at TIMESTAMP WITH TIME ZONE,
    estimated_delivery_date DATE,
    delivered_at TIMESTAMP WITH TIME ZONE
);

-- 16. DIGITAL DOWNLOADS
CREATE TABLE IF NOT EXISTS downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    download_token VARCHAR(255) UNIQUE NOT NULL,
    file_path TEXT NOT NULL,
    download_count INT DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. REVIEWS (Parent Experiences)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_id VARCHAR(100) REFERENCES stories(id),
    parent_name VARCHAR(100) NOT NULL,
    child_age INT NOT NULL,
    city VARCHAR(100),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT NOT NULL,
    verified_purchase BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. PRIVACY, CONSENT & PHOTO DELETION REQUESTS
CREATE TABLE IF NOT EXISTS consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    character_id UUID REFERENCES characters(id),
    parent_declared_guardian BOOLEAN DEFAULT TRUE,
    consent_version VARCHAR(20) DEFAULT 'v1.0',
    ip_address INET,
    consented_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS privacy_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    request_type VARCHAR(50) DEFAULT 'delete_all_photos' CHECK (request_type IN ('delete_all_photos', 'export_data', 'delete_account')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);
