"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwks = require("jwks-rsa");
/**
 * configured jwksClient for caching.
 */
exports.jwksClient = jwks({
    cache: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    rateLimit: true,
});
//# sourceMappingURL=jwks.js.map