/**
 * JWT Token Utility Functions
 * Provides client-side validation for JWT tokens without requiring the secret key
 */

interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

/**
 * Decodes a JWT token without verifying the signature
 * @param token - The JWT token string
 * @returns The decoded payload or null if invalid
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Checks if a JWT token is expired
 * @param token - The JWT token string
 * @returns true if expired, false if still valid
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  
  if (!payload || !payload.exp) {
    // If we can't decode or no expiration, consider it invalid
    return true;
  }

  // JWT exp is in seconds, Date.now() is in milliseconds
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

/**
 * Gets the time remaining before token expiration
 * @param token - The JWT token string
 * @returns Time remaining in seconds, or 0 if expired
 */
export function getTokenExpirationTime(token: string): number {
  const payload = decodeJWT(token);
  
  if (!payload || !payload.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const remaining = payload.exp - currentTime;
  return remaining > 0 ? remaining : 0;
}

/**
 * Validates if a token exists and is not expired
 * @param token - The JWT token string or null
 * @returns true if token is valid and not expired
 */
export function isValidToken(token: string | null): boolean {
  if (!token) {
    return false;
  }

  return !isTokenExpired(token);
}
