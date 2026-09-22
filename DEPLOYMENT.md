# 🚀 WanderLust Deployment Guide (Render & Vercel)

This comprehensive guide details step-by-step instructions to deploy the **WanderLust** full-stack application:
- **Backend API (Express / Node.js)** → Deployed on **[Render](https://render.com)**
- **Frontend App (React / Vite)** → Deployed on **[Vercel](https://vercel.com)**

---

## 🏗️ Architecture Overview

```
               ┌───────────────────────────────┐
               │    Vercel (Frontend App)      │
               │   https://your-app.vercel.app  │
               └───────────────┬───────────────┘
                               │
               (API Requests / ₹ INR Payments)
                               │
               ┌───────────────▼───────────────┐
               │     Render (Backend API)      │
               │ https://your-backend.onrender.com
               └───────────────┬───────────────┘
                               │
          ┌────────────────────┼───────────────────┐
          ▼                    ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Razorpay UPI   │ │  Merchant Bank   │ │ Neon PostgreSQL  │
│  Payment Gateway │ │  Settlement IMPS │ │   (Serverless)   │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

---

## 📦 Part 1: Deploy Backend to Render

### Option A: 1-Click Blueprint Deployment (Recommended)
Because this repository contains a `render.yaml` file:
1. Log in to your **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** → **Blueprint**.
3. Connect your Git repository (`WanderLust`).
4. Render will auto-detect `render.yaml` and configure the service:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Fill in any required environment variables (see below) and click **Apply**.

---

### Option B: Manual Web Service Setup
1. On the Render Dashboard, click **New +** → **Web Service**.
2. Connect your Git repository.
3. Configure the settings:
   - **Name:** `wanderlust-backend-api`
   - **Region:** Choose the closest region (e.g., *Singapore* or *Frankfurt*)
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** `Free`

4. Add **Environment Variables** under the **Environment** tab:

| Variable Name | Description | Example Value |
|---|---|---|
| `PORT` | Server Port | `3000` |
| `NODE_ENV` | Environment | `production` |
| `RAZORPAY_KEY_ID` | Razorpay Key ID | `rzp_test_wanderlust_luxury_2026` |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret | *(Your secret key)* |
| `MERCHANT_UPI_ID` | Merchant UPI ID | `wanderlust.rentals@razorpay` |
| `MERCHANT_ACCOUNT_NAME` | Beneficiary Account Name | `Himanshu (WanderLust Stays)` |
| `MERCHANT_BANK_NAME` | Beneficiary Bank Name | `HDFC Bank Ltd` |
| `MERCHANT_ACCOUNT_NO` | Beneficiary Account Number | `50100492817291` |
| `MERCHANT_IFSC_CODE` | Beneficiary IFSC Code | `HDFC0000240` |
| `DATABASE_URL` | Neon Postgres Connection String | *(Optional / Neon DB URL)* |
| `GEMINI_API_KEY` | Google Gemini AI Key (for Trip Planner) | *(Optional)* |
| `CLERK_PUBLISHABLE_KEY` | Clerk Authentication Publishable Key | *(Optional)* |
| `CLERK_SECRET_KEY` | Clerk Authentication Secret Key | *(Optional)* |

5. Click **Create Web Service**. Once deployed, copy your Render URL (e.g., `https://wanderlust-backend-api.onrender.com`).

---

## ⚡ Part 2: Deploy Frontend to Vercel

1. Log in to your **[Vercel Dashboard](https://vercel.com/)**.
2. Click **Add New...** → **Project**.
3. Import your Git repository (`WanderLust`).
4. In the configuration screen:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click *Edit* and select **`client`**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Add **Environment Variables** in the Vercel project configuration:

| Variable Name | Value |
|---|---|
| `VITE_BASE_URL` | Your deployed Render URL (e.g., `https://wanderlust-backend-api.onrender.com`) |
| `VITE_BACKEND_URL` | Your deployed Render URL (e.g., `https://wanderlust-backend-api.onrender.com`) |
| `VITE_CLERK_PUBLISHABLE_KEY` | *(Optional Clerk Key or leave default)* |

6. Click **Deploy**.
7. In ~60 seconds, Vercel will build and output your production domain (e.g., `https://wanderlust-luxury-stays.vercel.app`).

---

## 🔒 Part 3: Verification & Post-Deployment Checklist

- [ ] **Health Check:** Visit `https://your-backend.onrender.com/` → should output `Server is Live! WanderLust API is ready.`
- [ ] **Explore Listings:** Open your Vercel URL → check that stays load with ₹ INR prices.
- [ ] **AI Trip Planner:** Navigate to `/ai-planner` and generate a customized itinerary.
- [ ] **Razorpay Checkout:** Click **Reserve Now** on any stay → test UPI QR code generation and direct bank transfer with instant UTR validation.
- [ ] **Host & Admin Dashboards:** Access `/host` and `/admin` to inspect real-time metrics and bank payout settings.
