"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const util_1 = require("util");
const GraphqlAuthError_1 = require("./exceptions/GraphqlAuthError");
const jwt_runtypes_1 = require("./jwt.runtypes");
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
const getJWTData = (token) => {
    try {
        const dtoken = jwt.decode(token, { complete: true });
        return jwt_runtypes_1.RawJwtDataRecord.check(dtoken);
    }
    catch (e) {
        throw new GraphqlAuthError_1.GraphqlAuthError();
    }
};
const getSigningKey = (kid) => __awaiter(this, void 0, void 0, function* () {
    try {
        const key = yield util_1.promisify(client.getSigningKey)(kid);
        return key.publicKey != null ? key.publicKey : key.rsaPublicKey;
    }
    catch (e) {
        throw new GraphqlAuthError_1.GraphqlAuthError();
    }
});
/**
 * Authorize function.
 *
 * @TODO accept array of scopes to check against as well.
 */
exports.authorize = (authHeader) => __awaiter(this, void 0, void 0, function* () {
    // Split out "Bearer" from "JWT" in Authorization header.
    const [type, token] = authHeader.split(" ", 2);
    if (type !== "Bearer" || token == null || token === "") {
        throw new GraphqlAuthError_1.GraphqlAuthError();
    }
    const jwtData = getJWTData(token);
    const signingKey = yield getSigningKey(jwtData.header.kid);
    return new Promise((resolve, reject) => {
        jwt.verify(token, signingKey, options, (err, decoded) => {
            if (err !== undefined) {
                reject(err);
                return;
            }
            resolve(decoded);
        });
    });
});
//# sourceMappingURL=authorize.js.map