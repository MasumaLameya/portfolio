# Gray - Modern Portfolio & CMS (Angular + Supabase)

A high-performance personal vCard, portfolio, and CMS web application built with **Angular 18**, **Tailwind CSS**, and **Supabase (PostgreSQL & Storage)**.

---

## 🚀 Features

- **Pixel-Perfect Public Portfolio**: Hero section, dynamic typing, interactive skill progress, showcase filter, case study detail modals, client testimonials, resume timeline, and interactive contact form.
- **SaaS-Grade Admin CMS**: Modern dark-mode dashboard to manage Hero & Profile, Projects, Blog posts, Services, Testimonials, Resume timeline, Client logos, and Visitor messages.
- **Interactive Media Manager**: Drag-and-drop file upload, file browsing, and direct URL options supporting Supabase Storage bucket (`portfolio-media`) with automatic offline/base64 fallback.
- **Vercel Deployment Ready**: Pre-configured `vercel.json` with SPA route rewrites.

---

## 🛠️ Tech Stack

- **Frontend**: Angular 18 (Standalone Components, Signals)
- **Styling**: Tailwind CSS, Bootstrap Icons
- **Backend & Database**: Supabase (PostgreSQL Database, Storage & Authentication)
- **Deployment**: Vercel

---

## 📦 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment

Copy `src/environments/environment.example.ts` to `src/environments/environment.ts` and update with your Supabase project credentials:

```ts
export const environment = {
  production: false,
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key',
  storageBucket: 'portfolio-media'
};
```

### 3. Setup Supabase Database

Run the provided SQL migration script in your Supabase SQL Editor:
- File: `supabase-schema.sql`

This will automatically create tables for `profile`, `projects`, `blogs`, `services`, `testimonials`, `resume_items`, `clients`, and `contact_messages`.

### 4. Run Locally

```bash
npm start
# App running at http://localhost:4200/
```

- **Public Portfolio**: `http://localhost:4200/`
- **Admin Login**: `http://localhost:4200/admin/login`
- **Admin Dashboard**: `http://localhost:4200/admin`

---

## 🌐 Deploying to Vercel

1. Push this repository to your **GitHub** account.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Import Repository"**.
3. Vercel will automatically detect `vercel.json`:
   - **Framework Preset**: Angular
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/gray-portfolio/browser`
4. Click **Deploy**!

---

## 🔒 Security Note
No API keys, credentials, or secrets are stored in this repository. All credentials should be provided via your local `environment.ts` or Vercel environment variables.
