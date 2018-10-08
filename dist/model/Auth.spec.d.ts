import { Auth } from "./Auth";
/**
 * Tests for JWT Authorization.
 */
export declare class AuthorizeSpec {
    protected auth: Auth;
    protected jwksHost: string;
    protected jwt: string;
    before(): Promise<void>;
    noAuthHeaderError(): Promise<void>;
    invalidAuthHeaderError(): Promise<void>;
    decodeValidJWT(): Promise<void>;
}
