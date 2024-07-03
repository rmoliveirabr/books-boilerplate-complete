import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { authConfig } from '@/auth.config';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: authConfig.secret });

  console.log(`User is ${(token ? '' : 'NOT ')}authenticated`) // TODO: remove

  // Check if the user is not authenticated
  // if (!token) {
  //   // If the user is not authenticated and trying to access anything but the root path, redirect to the login page
  //   if (request.nextUrl.pathname !== '/' && request.nextUrl.pathname !== '/signin' && request.nextUrl.pathname !== '/signup' && request.nextUrl.pathname !== '/favicon.ico') {
  //     console.log(`... redirect to login page for path ${request.nextUrl.pathname}`) // TODO: remove
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  //   // Allow the request to proceed
  //   console.log('... allow the request to proceed') // TODO: remove
  //   return NextResponse.next();
  // }

  // If the user is authenticated, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|.webp|.png|.svg).*)'],
};
