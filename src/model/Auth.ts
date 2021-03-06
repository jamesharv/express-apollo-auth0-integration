import * as jwt from "jsonwebtoken";
import { promisify } from "util";
import { jwksClient } from "./jwks";
import { RawJwtData, RawJwtDataRecord, RawJwtPayload, RawJwtPayloadRecord } from "./jwt.runtypes";

/**
 * Auth class for handling JWT validation and decoding.
 */
export class Auth {
  private algorithms = ["RS256"];
  private auth0Domain: string;
  private audience: string;

  public constructor(
    private errorConstructor: { new(message?: string): Error },
  ) {
    this.auth0Domain = process.env.AUTH0_DOMAIN;
    this.audience = process.env.AUTH0_AUDIENCE;
  }

  /**
   * Authorization function that checks an Authorization header string for a valid JWT.
   */
  public async authorize(authHeader: string): Promise<RawJwtPayload> {
    this.validateHeader(authHeader);
    const token = this.splitHeader(authHeader);
    const jwtData = this.getJWTData(token);
    const signingKey = await this.getSigningKey(jwtData.header.kid);

    return new Promise<RawJwtPayload>((resolve, reject): void => {
      jwt.verify(token, signingKey, this.getOptions(), (err, decoded) => {
        if (err !== null) {
          reject(err);

          return;
        }
        const payload = RawJwtPayloadRecord.check(decoded);
        resolve(payload);
      });
    });
  }

  private getOptions(): jwt.VerifyOptions {
    return {
      algorithms: this.algorithms,
      audience: this.audience,
      issuer: `https://${this.auth0Domain}/`,
    };
  }

  /**
   * Validates presence of authHeader.
   */
  private validateHeader(authHeader: string): void {
    if (authHeader == null) {
      throw new this.errorConstructor("No Authorization header provided.");
    }
    const [type, token] = authHeader.split(" ", 2);
    if (type !== "Bearer" || token == null || token === "") {
      throw new this.errorConstructor("Incorrectly formatted Authorization header.");
    }
  }

  /**
   * Split out "Bearer" and "JWT" from Authorization header.
   */
  private splitHeader(authHeader: string): string {
    const [type, token] = authHeader.split(" ", 2);

    return token;
  }

  /**
   * Decodes a JWT.
   */
  private getJWTData(token: string): RawJwtData {
   try {
     const dtoken = jwt.decode(token, { complete: true });

     return RawJwtDataRecord.check(dtoken);
   }
   catch (e) {
     throw new this.errorConstructor("Incorrectly formatted JWT.");
   }
  }

  /**
   * Returns the signing key for a given kid.
   */
  private async getSigningKey(kid: string): Promise<string> {
    try {
      const key = await promisify(jwksClient.getSigningKey)(kid);

      return key.publicKey != null ? key.publicKey : key.rsaPublicKey;
    }
    catch (e) {
      throw new this.errorConstructor("Unable to retrieve public key from kid.");
    }
  }
}
