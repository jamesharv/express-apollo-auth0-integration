import { Array, Number, Record, Static, String } from "runtypes";
/**
 * Runtypes: define the JWT payload.
 */
export declare const RawJwtPayloadRecord: Record<{
    "aud": import("runtypes/lib/types/union").Union2<Array<String>, String>;
    "exp": Number;
    "http://getequiem.com/portals": Array<String>;
    "http://getequiem.com/uuid": String;
    "iat": Number;
    "iss": String;
    "sub": String;
}>;
/**
 * Runtypes: define the JWT header.
 */
export declare const RawJwtHeaderRecord: Record<{
    kid: String;
}>;
/**
 * Runtypes: define the JWT data.
 */
export declare const RawJwtDataRecord: Record<{
    header: Record<{
        kid: String;
    }>;
    payload: Record<{
        "aud": import("runtypes/lib/types/union").Union2<Array<String>, String>;
        "exp": Number;
        "http://getequiem.com/portals": Array<String>;
        "http://getequiem.com/uuid": String;
        "iat": Number;
        "iss": String;
        "sub": String;
    }>;
}>;
/**
 * Export the JWT data type.
 */
export declare type RawJwtData = Static<typeof RawJwtDataRecord>;
/**
 * Export the JWT payload type.
 */
export declare type RawJwtPayload = Static<typeof RawJwtPayloadRecord>;
