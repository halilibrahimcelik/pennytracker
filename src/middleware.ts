import type { auth } from '@/lib/auth';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  try {
    const { data: session } = await axios.get<Session>(
      '/api/auth/get-session',
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      }
    );

    // Check if session exists and is valid
    if (!session || !session.user) {
      console.log('No valid session, redirecting to sign-in');
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // Use :path* to match dashboard and all sub-routes
};
