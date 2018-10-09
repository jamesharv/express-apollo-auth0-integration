import { Array, Number, Partial, Record, Static, String } from "runtypes";
/**
 * Runtypes: define the JWT payload.
 */
export declare const RawJwtPayloadRecord: import("runtypes/lib/types/intersect").Intersect2<Record<{
    aud: import("runtypes/lib/types/union").Union2<Array<String>, String>;
    exp: Number;
    iss: String;
    sub: String;
}>, Partial<{
    "http://getequiem.com/portal": String;
    "http://getequiem.com/user": String;
    "iat": Number;
}>>;
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
    payload: import("runtypes/lib/types/intersect").Intersect2<Record<{
        aud: import("runtypes/lib/types/union").Union2<Array<String>, String>;
        exp: Number;
        iss: String;
        sub: String;
    }>, Partial<{
        "http://getequiem.com/portal": String;
        "http://getequiem.com/user": String;
        "iat": Number;
    }>>;
}>;
/**
 * Export the JWT data type.
 */
export declare type RawJwtData = Static<typeof RawJwtDataRecord>;
/**
 * Export the JWT payload type.
 */
export declare type RawJwtPayload = Static<typeof RawJwtPayloadRecord>;
