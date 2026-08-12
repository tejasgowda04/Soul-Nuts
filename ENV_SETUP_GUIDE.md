# 🛠️ Step-by-Step Guide: Setting Up Your `.env` Credentials

This guide provides simple step-by-step instructions to get your live **Supabase** and **Cloudinary** credentials and add them to your `.env` file.

---

## 📁 Step 0: Locating Your `.env` File

Open the `.env` file in the root folder of your project (`SoulNuts/.env`).

It should look like this:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Cloudinary Configuration (Unsigned Upload Preset)
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-unsigned-upload-preset
```

---

## ⚡ Part 1: How to Get Supabase Credentials

### Step 1: Create a Supabase Account & Project
1. Go to **[supabase.com](https://supabase.com)** and click **Start your project** (or Log In).
2. Click **New Project**.
3. Fill in:
   - **Name**: `Sol Nuts`
   - **Database Password**: Choose a strong password and save it safely.
   - **Region**: Choose `South Asia (Mumbai)` or nearest location.
4. Click **Create new project** and wait 1–2 minutes for setup.

### Step 2: Get Your API Keys
1. In your Supabase Dashboard left sidebar, click the **Settings** gear icon (⚙️) -> **API**.
2. Under **Project URL**:
   - Copy the URL (e.g., `https://xyzabc123.supabase.co`)
   - Paste it in `.env` as `VITE_SUPABASE_URL=`
3. Under **Project API Keys**:
   - Find the key labeled `anon` `public`
   - Copy the token string (starts with `eyJ...`)
   - Paste it in `.env` as `VITE_SUPABASE_ANON_KEY=`

### Step 3: Setup Database Tables (1-Click Run)
1. In Supabase Dashboard, click **SQL Editor** (icon with `>_` on left sidebar).
2. Click **New Query**.
3. Open the `supabase_schema.sql` file from your project folder.
4. Copy all text, paste it into the Supabase SQL editor, and click **Run**.

---

## ☁️ Part 2: How to Get Cloudinary Credentials

### Step 1: Create a Free Cloudinary Account
1. Go to **[cloudinary.com](https://cloudinary.com)** and sign up for a free account.
2. Once logged in, open the **Dashboard**.

### Step 2: Copy Your Cloud Name
1. On your Dashboard homepage, look at **Product Environment Credentials**.
2. Copy your **Cloud Name** (e.g., `dxy123abc`).
3. Paste it in `.env` as `VITE_CLOUDINARY_CLOUD_NAME=`

### Step 3: Create an Unsigned Upload Preset
1. Click the **Settings** gear icon (⚙️) on top right.
2. Click the **Upload** tab.
3. Scroll down to **Upload presets** section and click **Add upload preset**.
4. Configure:
   - **Upload preset name**: Type `soulnuts_products` (or any name you like).
   - **Signing Mode**: Change from *Signed* to **Unsigned** (crucial for client-side uploads).
5. Click **Save** at the bottom.
6. Copy the preset name (`soulnuts_products`) and paste it in `.env` as `VITE_CLOUDINARY_UPLOAD_PRESET=`

---

## 🚀 Step 4: Restart Your Dev Server

After saving your `.env` file, restart Vite dev server:

```bash
npm run dev
```

Your Sol Nuts admin dashboard and customer store will now communicate directly with your live Supabase database & Cloudinary CDN!
