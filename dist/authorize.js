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
const client = jwks({
    cache: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    rateLimit: true,
});
const getKey = (header, cb) => {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
};
const options = {
    algorithms: ["RS256"],
    audience: process.env.AUTH0_AUDIENCE,
    issuer: "https://tester-equiem.au.auth0.com/",
};
/**
 * Authorize function.
 *
 * @TODO accept array of scopes to check against as well.
 */
exports.authorize = (authHeader) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        // Split out "Bearer" from "JWT" in Authorization header.
        const tokenArray = authHeader.split(" ");
        jwt.verify(tokenArray[1], getKey, options, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(decoded);
        });
    });
});
//# sourceMappingURL=authorize.js.map