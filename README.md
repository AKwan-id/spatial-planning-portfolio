# 🌍 Spatial Planning Portfolio & Intelligent AI Agent

An ultra-premium, interactive portfolio web application built specifically for Spatial Planners, GIS Analysts, and Urban Policy experts. This repository contains the source code for a highly dynamic frontend combined with a secure serverless backend.

## ✨ Key Capabilities

1. **Cinematic Hero Animations**
   - High-performance, scroll-driven Canvas image sequence rendering for an immersive visual experience.
   - Smooth staggered reveals across sections using Framer Motion.

2. **🤖 Secure Autonomous AI Assistant (Vercel Edge)**
   - Powered by the official `@google/genai` SDK (Gemini Flash).
   - Features **Server-Sent Events (SSE) Streaming** for real-time typewriter output.
   - Implements **Enterprise-grade Security**: Includes strict Prompt Guardrails, 100% hidden server-side API Keys, and an Edge-level Sliding Window Rate Limiter (Anti-DDoS Token Exhaustion).

3. **Restricted Owner Dashboard (CMS)**
   - A stealthy Administrator CMS accessible only via Google OAuth.
   - Managed entirely by Supabase Database with strict Row Level Security (RLS) tracking to ensure only verified administrators can Create, Read (Drafts), Update, or Delete data.
   - Intelligent Auto-Logout tracking user inactivity to prevent localized device hijacking.

4. **Dynamic Context Feeding**
   - The AI Agent reads its knowledge base directly from the real-time database inputs, eliminating the need to ever touch the code after deployment.

## 🛠 Tech Stack
- **Frontend Core:** React 19, TypeScript, Vite
- **Styling & Animation:** Tailwind CSS, Framer Motion
- **Backend & Proxy:** Vercel Edge Serverless Functions
- **Database & Auth:** Supabase (PostgreSQL, OAuth 2.0)

---

## 🚀 Local Development Setup

> **⚠️ SECURITY WARNING:** This repository heavily obfuscates API keys and database endpoints. You **MUST** provide your own keys to run this locally. Do not commit your personal `.env` file or Database credentials to the public repository.

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Fork & Install
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/spatial-planning-portfolio.git
cd spatial-planning-portfolio
npm install
```

### 3. Environment Variables
Duplicate the `.env.example` file to create your local `.env`.
```bash
cp .env.example .env
```
Fill in the blanks using your own platform keys:
- `VITE_SUPABASE_URL`: Your Supabase Project URL.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase Public Anon Key.
- `GEMINI_API_KEY`: Your personal Google AI Studio Key (DO NOT expose to frontend variables!).

### 4. Database Initialization (Supabase)
To make the CMS work, you must create the following tables in your Supabase SQL Editor and enable RLS:
- `admin_users` (Requires manual `email` insertion for the Owner Auth Bypass)
- `projects`
- `skills`
- `experience`
- `certificates`

*A sample `secure_rls.sql` script is included in the project root to help you lock down the Row Level Security policies instantly.*

### 5. Run the Server
```bash
npm run dev
```

---
*Built with logic, passion, and precision.*
