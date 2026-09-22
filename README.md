# 🌌 WanderLust – Luxury Vacation Rental & Stay Booking Platform

**WanderLust** is an ultra-premium, full-stack luxury vacation rental and hosting platform (inspired by Airbnb and high-end boutique travel marketplaces). It features end-to-end stays exploration, AI vacation trip planning, **Razorpay Dynamic UPI QR payments**, **Direct Beneficiary Bank Settlements (IMPS/NEFT) in Indian Rupees (₹ INR)**, multi-role access control (Guest, Host, Admin), and automated receipt generation.

---

## 💎 Features

### 🏡 Luxury Stays & Vacation Bookings
* **Curated Luxury Accommodations**: Handpicked villas, beachfront sanctuaries, alpine chalets, historic castles, and tropical overwater bungalows.
* **Category Filtering**: Seamless browsing across Beachfront, Luxury Villas, Cabins, Iconic Cities, Castles, Treehouses, and Lakefront stays.
* **Interactive Live Search**: Filter listings by destination, travel dates, price range in ₹ INR (`₹5,000` – `₹1,50,000+`), and guest capacity.
* **Wishlist Collections**: 1-click persistent favorite stays management with instant local synchronization.

### 🇮🇳 100% Native Indian Rupee (₹ INR) Payments & Razorpay
* **Razorpay UPI QR Code Checkout**: Generates instant, dynamic UPI QR codes compatible with Google Pay, PhonePe, Paytm, and BHIM UPI with real-time countdown timer and laser-scanning animations.
* **Direct Beneficiary Bank Settlement**: Direct wire transfer (IMPS/NEFT) displaying verified merchant bank account credentials (`HDFC Bank Ltd`, A/C `50100492817291`, IFSC `HDFC0000240`) with 1-click clipboard copying and UTR confirmation.
* **Official Invoice & Receipt Generator**: Downloadable detailed text receipts with unique booking reference codes, stay details, host information, WanderCover protection, and transaction IDs in ₹ INR.

### 🤖 AI Vacation Trip Concierge
* **WanderAI Itinerary Generator**: Custom day-by-day vacation planning with suggested hidden gems, photo spots, local dining, and handpicked accommodations powered by Google Gemini AI.

### 👑 Multi-Role Control Panels
* **Host Management Hub (`/host-dashboard`)**: Track 30-day direct deposits (`₹24,50,000`), manage listed properties, toggle listing availability, and review guest arrivals.
* **Admin Master Console (`/admin`)**: Monitor platform gross volume (`₹1,48,90,000`), 10% platform net commissions (`₹14,89,000`), manage user roles (Guest / Host / Super Admin), and customize beneficiary bank details.
* **Guest Travel Hub (`/trips`)**: View confirmed reservations, reference numbers, check-in dates, and manage booking cancellations.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide Icons, React Router v7, Axios, React Hot Toast |
| **Backend** | Node.js, Express.js, Clerk Auth, Neon PostgreSQL, Multer, Cloudinary |
| **Payments** | Razorpay UPI Gateway, Direct Beneficiary IMPS/NEFT Settlements (₹ INR) |
| **AI Integration** | Google Gemini 2.0 Flash (AI Trip Concierge & Content Tools) |
| **Deployment** | **Vercel** (Frontend) & **Render** (Backend) |

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/himanshuya1008/WanderLust-.git
cd WanderLust-

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Environment Variables Configuration

**Backend (`server/.env`):**
```env
PORT=3000
DATABASE_URL=your_neon_postgresql_uri
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=rzp_test_wanderlust_luxury_2026
MERCHANT_UPI_ID=wanderlust.rentals@razorpay
MERCHANT_ACCOUNT_NAME=Himanshu (WanderLust Stays)
MERCHANT_BANK_NAME=HDFC Bank Ltd
MERCHANT_ACCOUNT_NO=50100492817291
MERCHANT_IFSC_CODE=HDFC0000240
```

**Frontend (`client/.env.local`):**
```env
VITE_BASE_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Run Development Servers
```bash
# In server directory:
node server.js

# In client directory:
npm run dev
```

Visit **http://localhost:5173** to explore WanderLust.

---

## 🌐 Cloud Deployment (Render & Vercel)

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full step-by-step instructions.

- **Backend (Render):** Deploy using the included `render.yaml` blueprint with root directory `server`.
- **Frontend (Vercel):** Connect repository with root directory `client` and set `VITE_BASE_URL` to your Render API URL.

---

## 📄 License
This project is open-source under the MIT License.
