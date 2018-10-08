import * as jwt from "jsonwebtoken";
import * as jwks from "jwks-rsa";
import { promisify } from "util";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";
import { RawJwtData, RawJwtDataRecord } from "./jwt.runtypes";

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
   throw new GraphqlAuthError();
 }
};

const getSigningKey = async (kid: string): Promise<string> => {
  try {
    const key: jwks.Jwk = await promisify(client.getSigningKey)(kid);

    return key.publicKey != null ? key.publicKey : key.rsaPublicKey;
  }
  catch (e) {
    throw new GraphqlAuthError();
  }
};

/**
 * Authorize function.
 *
 * @TODO accept array of scopes to check against as well.
 */
export const authorize = async (authHeader: string): Promise<any> => {
  // Split out "Bearer" from "JWT" in Authorization header.
  const [type, token] = authHeader.split(" ", 2);
  if (type !== "Bearer" || token == null || token === "") {
    throw new GraphqlAuthError();
  }
  const jwtData = getJWTData(token);
  const signingKey = await getSigningKey(jwtData.header.kid);

  return new Promise((resolve, reject): void => {
    jwt.verify(token, signingKey, options, (err, decoded) => {
      if (err !== undefined) {
        reject(err);

        return;
      }
      resolve(decoded);
    });
  });
};
