import * as jwt from "jsonwebtoken";
import * as jwks from "jwks-rsa";
import { promisify } from "util";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";
import { RawJwtData, RawJwtDataRecord } from "./model/jwt.runtypes";

const client = jwks({
  cache: true,
  jwksRequestsPerMinute: 10,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  rateLimit: true,
});

const options = {
  algorithms: ["RS256"],
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
};

const getJWTData = (token: string): RawJwtData => {
 try {
   const dtoken = jwt.decode(token, { complete: true });

   return RawJwtDataRecord.check(dtoken);
 }
 catch (e) {
   throw new GraphqlAuthError("Incorrectly formatted JWT.");
 }
};

const getSigningKey = async (kid: string): Promise<string> => {
  try {
    const key = await promisify(client.getSigningKey)(kid);

    return key.publicKey != null ? key.publicKey : key.rsaPublicKey;
  }
  catch (e) {
    throw new GraphqlAuthError("Unable to retrieve public key from kid.");
  }
};

/**
 * Authorize function.
 *
 * Takes an Authorization header in the form of `Bearer ey...` and performs auth.
 *
 * @TODO scope authorization.
 */
export const authorize = async (authHeader?: string, scopes: string[] = []): Promise<any> => {
  if (authHeader == null) {
    throw new GraphqlAuthError("No Authorization header provided.");
  }

  // Split out "Bearer" from "JWT" in Authorization header.
  const [type, token] = authHeader.split(" ", 2);
  if (type !== "Bearer" || token == null || token === "") {
    throw new GraphqlAuthError("Incorrectly formatted Authorization header.");
  }
  const jwtData = getJWTData(token);
  const signingKey = await getSigningKey(jwtData.header.kid);

  return new Promise((resolve, reject): void => {
    jwt.verify(token, signingKey, options, (err, decoded) => {
      if (err !== undefined) {
        console.log("JWT verification error:", err);
        reject(err);

        return;
      }
      resolve(decoded);
    });
  });
};
