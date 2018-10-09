import { Array, Number, Partial, Record, Static, String, Union } from "runtypes";

/**
 * Runtypes: define the JWT payload.
 */
export const RawJwtPayloadRecord = Record({
  aud: Union(
    Array(String),
    String,
  ),
  exp: Number,
  iss: String,
  sub: String,
}).And(Partial({
  "http://getequiem.com/portal": String,
  "http://getequiem.com/user": String,
  "iat": Number,
}));

/**
 * Runtypes: define the JWT header.
 */
export const RawJwtHeaderRecord = Record({
  kid: String,
});

/**
 * Runtypes: define the JWT data.
 */
export const RawJwtDataRecord = Record({
  header: RawJwtHeaderRecord,
  payload: RawJwtPayloadRecord,
});

/**
 * Export the JWT data type.
 */
export type RawJwtData = Static<typeof RawJwtDataRecord>;

/**
 * Export the JWT payload type.
 */
export type RawJwtPayload = Static<typeof RawJwtPayloadRecord>;
