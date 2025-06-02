// src/middleware.js
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['fr'],
  defaultLocale: 'fr',
  localePrefix: 'never',
});

export function middleware(request) {
  const { pathname } = request.nextUrl;

 if (pathname === '/accueil' || pathname === '/fr') {
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url, 301);
}

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
