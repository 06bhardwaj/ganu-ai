# Ganu AI - Premium AI Chatbot Platform

A production-level AI chatbot website built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## 🚀 Features

- **Futuristic UI**: Premium dark-themed design with golden-orange highlights and smooth animations.
- **Authentication**: Secure JWT-based authentication using NextAuth.js (Sign up, Login, Forgot Password).
- **Intelligent Chat**: Real-time messaging with OpenAI integration and context-aware memory.
- **User Dashboard**: Analytics, recent chats, and account management.
- **Admin Panel**: User management, system health monitoring, and usage analytics.
- **Security**: Middleware-based route protection and API rate limiting.
- **Responsive**: Fully optimized for mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Next.js API Routes, NextAuth.js, Mongoose.
- **Database**: MongoDB (Atlas or local).
- **AI**: OpenAI API.

## 🏁 Getting Started

### 1. Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
  - **Local**: Download from [mongodb.com](https://www.mongodb.com/try/download/community) and ensure it's running on port 27017.
  - **Atlas (Cloud)**: Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas) and get your connection string.

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

## 📂 Project Structure

- `src/app`: Application routes and pages.
- `src/components`: Reusable UI components.
- `src/models`: Mongoose database models.
- `src/lib`: Shared utilities and database connection.
- `src/providers`: React context providers (Auth).
- `src/middleware.ts`: Security and route protection.

## 🚢 Deployment (Vercel - Recommended)

Since Ganu AI is built with Next.js, **Vercel** is the easiest way to deploy it for free.

### 1. Push to GitHub
- Create a new repository on GitHub.
- Push your code:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin your-repo-url
  git push -u origin main
  ```

### 2. Import to Vercel
- Go to [vercel.com](https://vercel.com) and log in with GitHub.
- Click **"Add New"** -> **"Project"**.
- Import your `ganu` repository.

### 3. Configure Environment Variables
In the Vercel project settings, add the following keys from your `.env.local`:
- `MONGODB_URI`: Your Atlas connection string.
- `NEXTAUTH_SECRET`: Your generated secret.
- `NEXTAUTH_URL`: Your production URL (e.g., `https://ganu-ai.vercel.app`).

### 4. Database Access
- Go to **MongoDB Atlas**.
- In **Network Access**, ensure you have either:
  - Added `0.0.0.0/0` (Allows all connections - required for Vercel dynamic IPs).
  - Or use the Vercel MongoDB integration.

### 5. Deploy
- Click **"Deploy"**. Your site will be live in less than 2 minutes!
