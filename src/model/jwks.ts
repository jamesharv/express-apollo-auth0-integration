import * as jwks from "jwks-rsa";

/**
 * configured jwksClient for caching.
 */
export const jwksClient = jwks({
  cache: true,
  jwksRequestsPerMinute: 10,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  rateLimit: true,
});
