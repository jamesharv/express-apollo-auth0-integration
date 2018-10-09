/**
 * Tests for JWT Authorization.
 */
export declare class AuthorizeSpec {
    protected jwksHost: string;
    protected jwt: string;
    before(): Promise<void>;
    noAuthHeader(): Promise<void>;
    invalidAuthHeaderError(): Promise<void>;
    validAuthHeader(): Promise<void>;
}
