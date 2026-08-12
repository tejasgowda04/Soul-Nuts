-- =========================================================
-- SOUL NUTS — SUPABASE DATABASE SCHEMA & SECURITY POLICIES
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------
-- 1. CATEGORIES TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------
-- 2. PRODUCTS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_slug VARCHAR(100),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    discount_price NUMERIC(10, 2) CHECK (discount_price >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    sku VARCHAR(100),
    unit VARCHAR(50) DEFAULT '250g',
    main_image TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    color_key VARCHAR(50) DEFAULT 'almond',
    weight_options JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------
-- 3. USER ROLES TABLE (ADMIN AUTHORIZATION)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_role UNIQUE (user_id, role)
);

-- ---------------------------------------------------------
-- 4. ORDERS & ORDER ITEMS TABLES
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    payment_status VARCHAR(50) DEFAULT 'Pending',
    order_status VARCHAR(50) DEFAULT 'Pending', -- Pending, Confirmed, Processing, Shipped, Delivered, Cancelled
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    weight_option VARCHAR(50),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ---------------------------------------------------------

-- Enable RLS on all public tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CATEGORIES POLICIES
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can manage categories" ON public.categories;

CREATE POLICY "Public can view active categories" ON public.categories
    FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Anyone can manage categories" ON public.categories
    FOR ALL USING (true) WITH CHECK (true);

-- PRODUCTS POLICIES
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Anyone can manage products" ON public.products;

CREATE POLICY "Public can view active products" ON public.products
    FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Anyone can manage products" ON public.products
    FOR ALL USING (true) WITH CHECK (true);

-- USER ROLES POLICIES
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;

CREATE POLICY "Users can read own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admins can manage user roles" ON public.user_roles
    FOR ALL USING (public.is_admin());

-- ORDERS POLICIES
DROP POLICY IF EXISTS "Public can create orders" ON public.orders;
DROP POLICY IF EXISTS "Public can view own orders by email or phone" ON public.orders;
DROP POLICY IF EXISTS "Admins can view and manage all orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can manage orders" ON public.orders;

CREATE POLICY "Anyone can manage orders" ON public.orders
    FOR ALL USING (true) WITH CHECK (true);

-- ORDER ITEMS POLICIES
DROP POLICY IF EXISTS "Public can create order items" ON public.order_items;
DROP POLICY IF EXISTS "Public can view order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can view and manage all order items" ON public.order_items;
DROP POLICY IF EXISTS "Anyone can manage order items" ON public.order_items;

CREATE POLICY "Anyone can manage order items" ON public.order_items
    FOR ALL USING (true) WITH CHECK (true);

-- ---------------------------------------------------------
-- 6. SEED DATA (INITIAL CATEGORIES)
-- ---------------------------------------------------------
INSERT INTO public.categories (name, slug, description, is_active) VALUES
('Dry Fruits', 'dry-fruits', 'Premium hand-selected almonds, cashews, pistachios and walnuts.', true),
('Nuts', 'nuts', 'Nutritious whole nuts sourced directly from prime harvests.', true),
('Seeds', 'seeds', 'Superfood seed blends and raw organic seeds.', true),
('Ladoos', 'ladoos', 'Traditional home-made ladoos with zero refined sugar.', true),
('Combo Packs', 'combo-packs', 'Curated daily snacking pouches and gift boxes.', true)
ON CONFLICT (slug) DO NOTHING;
