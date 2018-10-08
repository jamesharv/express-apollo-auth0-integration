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
     * Authorization function that checks an authHeader and optional scopes.
     */
    authorize(authHeader: string, scopes?: string[]): Promise<RawJwtPayload>;
    private getOptions;
    private splitHeader;
    private validateHeader;
    /**
     * Decodes a JWT.
     */
    private getJWTData;
    /**
     * Returns the signing key for a given kid.
     */
    private getSigningKey;
}
