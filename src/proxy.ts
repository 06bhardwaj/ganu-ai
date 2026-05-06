import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Simple in-memory rate limiter (Note: this will reset on every serverless function cold start)
// For production, use Redis or a dedicated rate limiting service.
const rateLimitMap = new Map();

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Log for debugging (you can see this in your terminal)
  console.log(`Proxy checking: ${pathname} | User logged in: ${!!token} | Role: ${token?.role}`);

  // 1. Protected Routes
  if (pathname.startsWith('/chat') || pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!token) {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    // Admin only route
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // 2. API Rate Limiting for Chat
  if (pathname.startsWith('/api/chat') && req.method === 'POST') {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'anonymous';
    const limit = 10; // 10 requests
    const windowMs = 60 * 1000; // 1 minute

    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > userLimit.resetTime) {
      userLimit.count = 1;
      userLimit.resetTime = now + windowMs;
    } else {
      userLimit.count++;
    }

    rateLimitMap.set(ip, userLimit);

    if (userLimit.count > limit) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/chat/:path*',
    '/dashboard/:path*',
    '/dashboard',
    '/admin/:path*',
    '/admin',
    '/api/chat/:path*',
    '/api/admin/:path*'
  ],
};
