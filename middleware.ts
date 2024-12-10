import createMiddleware from 'next-intl/middleware';
import { availableTranslations, defaultTranslation } from './locales/variables';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: availableTranslations,
 
  // Used when no locale matches
  defaultLocale: defaultTranslation
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', `/(ua|en)/:path*`]
};