import * as jwt from "jsonwebtoken";
import * as jwks from "jwks-rsa";

const client = jwks({
  cache: true,
  jwksRequestsPerMinute: 10,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  rateLimit: true,
});

const getKey = (header: { kid: string }, cb: (header: string, key: string) => string): void => {
  client.getSigningKey(header.kid, (err, key): void => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
};

const options = {
  algorithms: ["RS256"],
  audience: process.env.AUTH0_AUDIENCE,
  issuer: "https://tester-equiem.au.auth0.com/",
};

/**
 * Authorize function.
 *
 * @TODO accept array of scopes to check against as well.
 */
export const authorize = async (authHeader: string): Promise<any> =>
  new Promise((resolve, reject): void => {
    // Split out "Bearer" from "JWT" in Authorization header.
    const tokenArray = authHeader.split(" ");
    jwt.verify(tokenArray[1], getKey, options, (err, decoded) => {
      if (err) {
        reject(err);

        return;
      }
      resolve(decoded);
    });
  });
