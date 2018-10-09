"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtypes_1 = require("runtypes");
/**
 * Runtypes: define the JWT payload.
 */
exports.RawJwtPayloadRecord = runtypes_1.Record({
    aud: runtypes_1.Union(runtypes_1.Array(runtypes_1.String), runtypes_1.String),
    exp: runtypes_1.Number,
    iss: runtypes_1.String,
    sub: runtypes_1.String,
}).And(runtypes_1.Partial({
    "http://getequiem.com/portal": runtypes_1.String,
    "http://getequiem.com/user": runtypes_1.String,
    "iat": runtypes_1.Number,
}));
/**
 * Runtypes: define the JWT header.
 */
exports.RawJwtHeaderRecord = runtypes_1.Record({
    kid: runtypes_1.String,
});
/**
 * Runtypes: define the JWT data.
 */
exports.RawJwtDataRecord = runtypes_1.Record({
    header: exports.RawJwtHeaderRecord,
    payload: exports.RawJwtPayloadRecord,
});
//# sourceMappingURL=jwt.runtypes.js.map