import { RawJwtPayload } from "./jwt.runtypes";
/**
 * Auth class for handling JWT validation and decoding.
 */
export declare class Auth {
    private algorithms;
    private auth0Domain;
    private audience;
    constructor();
    /**
     * Authorization function that checks an Authorization header string for a valid JWT.
     */
    authorize(authHeader: string): Promise<RawJwtPayload>;
    private getOptions;
    /**
     * Validates presence of authHeader.
     */
    private validateHeader;
    /**
     * Split out "Bearer" and "JWT" from Authorization header.
     */
    private splitHeader;
    /**
     * Decodes a JWT.
     */
    private getJWTData;
    /**
     * Returns the signing key for a given kid.
     */
    private getSigningKey;
}
