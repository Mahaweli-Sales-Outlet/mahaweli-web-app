/**
 * CSRF Protection Utility
 * Client-side CSRF token management
 */

const CSRF_HEADER = "x-csrf-token";
const CSRF_COOKIE = "csrfToken";

/**
 * Get CSRF token from cookies
 */
export function getCsrfToken(): string | null {
  const name = CSRF_COOKIE + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }

  return null;
}

/**
 * Add CSRF token to request headers
 * Used by Axios interceptor
 */
export function addCsrfTokenToConfig(config: any): any {
  const token = getCsrfToken();
  if (token) {
    config.headers[CSRF_HEADER] = token;
  }
  return config;
}
