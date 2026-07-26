# 🌌 WanderLust AI - Full-Stack SaaS Content & Image Generation Platform

WanderLust is an all-in-one, production-ready AI Software-as-a-Service (SaaS) platform built for creators, marketers, developers, and professionals. Leveraging cutting-edge AI technologies, it empowers users to write articles, generate catch-worthy blog titles, create breathtaking images from textual descriptions, remove backgrounds, erase unwanted objects, and review resumes. 

The application is structured into a modern monorepo featuring a **React 19 + Tailwind CSS v4** frontend client and a robust **Node.js + Express + PostgreSQL (Neon DB)** backend server, protected by **Clerk Authentication** with free & premium subscription tiers.

---

## ✨ Features

### ✍️ AI Content Generation
* **AI Article Writer**: Instantly generate detailed, engaging articles on any topic using the **Gemini 2.0 Flash** model. Customize output lengths dynamically.
* **Blog Title Generator**: Generate high-converting, SEO-optimized titles categorized by industry or general topics to boost click-through rates.

### 🎨 AI Image Generation & Editing
* **Text-to-Image**: Convert descriptive text prompts into high-resolution visuals using the **ClipDrop API**.
* **AI Background Removal**: Upload any image and cleanly extract the subject, powered by **Cloudinary's AI Transformation** models.
* **AI Object Removal**: Specify an object to erase (e.g., "powerlines", "photobomber") and seamlessly restore the background using Cloudinary's generative remove tool (`gen_remove`).

### 📄 AI Resume Reviewer
* **Smart PDF Parsing**: Upload a resume in PDF format. The backend extracts structural layout and textual metadata using `pdf-parse`.
* **Actionable Feedback**: Evaluates strengths, highlights core weaknesses, and generates constructive improvement recommendations using **Gemini 2.0 Flash**.

### 👥 Dashboard & Community Hub
* **Creator Dashboard**: View personal creation statistics, history, and manage/publish generated items.
* **Community Showcase**: A shared feed displaying published AI art creations.
* **Engagement Engine**: Includes a reactive liking/unliking system, storing user interactions directly in PostgreSQL array structures.

### 💳 Tiered Access Controls
* **Secure Auth**: Fully guarded routes powered by Clerk (`@clerk/clerk-react` and `@clerk/express`).
* **Subscription Tiers**:
  - **Free Tier**: Limited to a maximum of `10` content generations (Articles / Blog Titles).
  - **Premium Tier**: Grants access to premium capabilities (Image Generation, Background/Object Removal, Resume Review) and lifts usage constraints.
* **Stripe & Clerk Billing**: Native pricing table integrations (`<PricingTable/>`) for seamless checkout.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router Dom v7, Axios, Lucide React, React Hot Toast |
| **Backend** | Node.js, Express.js, Clerk Express, Multer, PDF-Parse, Axios |
| **Database** | PostgreSQL (hosted via **Neon Database Serverless**) |
| **AI & Media Services** | Google Gemini (via OpenAI SDK gateway), ClipDrop API, Cloudinary (for image transformations & storage) |
| **Authentication** | Clerk Auth |

---

## 💾 Database Schema (PostgreSQL)

The platform runs on a relational PostgreSQL database. Here is the structure of the central `creations` table:

```sql
CREATE TABLE creations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'article', 'blog-title', 'image', 'resume-review'
    publish BOOLEAN DEFAULT FALSE,
    likes TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚙️ Environment Configuration

To run this project locally, configure the environment files for both the client and server.

### 1. Server Environment Variables
Create a file named `.env` in the `server` directory:

```env
PORT=3000
DATABASE_URL=your_neon_postgresql_uri
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 2. Client Environment Variables
Create a file named `.env.local` in the `client` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🚀 Setup & Installation

### Prerequisites
Make sure you have [Node.js (v18+)](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Step 1: Clone the Repository
```bash
git clone https://github.com/himanshuya1008/WanderLust-.git
cd WanderLust-
```

### Step 2: Run the Backend Server
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the node server in development mode (using nodemon):
   ```bash
   npm run server
   ```
   *The backend will boot up on `http://localhost:3000`.*

### Step 3: Run the Frontend Client
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
   *The application will launch on `http://localhost:5173`.*

---

## 🧑‍💻 License

This project is licensed under the ISC License.
