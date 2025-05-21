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

  // 🔁 Redirection manuelle de /accueil → /
  if (pathname === '/accueil') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
