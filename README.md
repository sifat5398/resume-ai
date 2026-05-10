# ResumeAI

An AI-powered resume reviewer SaaS built with Next.js 14, Tailwind CSS, Prisma, and Claude AI.

## Overview

ResumeAI allows users to upload a PDF resume or paste its text to get instant, expert-level feedback. The application uses Claude to score the resume, break down feedback by section, highlight strengths and areas for improvement, and extract ATS keywords.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **AI**: Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Database**: PostgreSQL (Prisma ORM)
- **Auth**: NextAuth.js (GitHub + Magic Link)
- **Email**: Resend
- **PDF Extraction**: `pdf-parse`

## Setup Instructions

1. **Clone the repository**

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Copy `.env.example` to `.env.local` and fill in the values:
   ```bash
   cp .env.example .env.local
   ```
   - **NEXTAUTH_SECRET**: Generate with `openssl rand -base64 32`
   - **GITHUB_CLIENT_ID / SECRET**: Create an OAuth App on GitHub. Callback URL: `http://localhost:3000/api/auth/callback/github`
   - **ANTHROPIC_API_KEY**: Your Anthropic Console API key
   - **EMAIL_SERVER_PASSWORD**: Your Resend API key
   - **DATABASE_URL**: PostgreSQL URL

4. **Database Setup**
   ```bash
   pnpm exec prisma migrate dev --name init
   pnpm exec prisma generate
   ```

5. **Run the Development Server**
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:3000`

## Production Deployment

### 1. Database Setup
SQLite works locally but not on Vercel. We use PostgreSQL for production.
- Create a free PostgreSQL database at **[Neon.tech](https://neon.tech)**.
- Copy your connection string.

### 2. Vercel Deployment
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Configure the environment variables in the Vercel dashboard (see `DEPLOY_CHECKLIST.md`).

### 3. GitHub OAuth Callback
- After deploying to Vercel, copy your production URL (e.g., `https://resume-ai-three.vercel.app`).
- Go to your GitHub Developer Settings → OAuth Apps → ResumeAI.
- Add a new **Authorization callback URL**: `https://YOUR-VERCEL-URL/api/auth/callback/github`
- Ensure `NEXTAUTH_URL` in Vercel is set to your production URL.

## License

MIT
