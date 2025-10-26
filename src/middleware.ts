import type { auth } from '@/lib/auth/auth';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from './types';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith(ROUTES.DASHBOARD)) {
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
        return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
