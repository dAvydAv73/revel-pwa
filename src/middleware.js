import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from '../src/i18n';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix,
});

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next|.*\\..*).*)']
};