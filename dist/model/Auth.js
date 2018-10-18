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
const util_1 = require("util");
const jwks_1 = require("./jwks");
const jwt_runtypes_1 = require("./jwt.runtypes");
/**
 * Auth class for handling JWT validation and decoding.
 */
class Auth {
    constructor(errorConstructor) {
        this.errorConstructor = errorConstructor;
        this.algorithms = ["RS256"];
        this.auth0Domain = process.env.AUTH0_DOMAIN;
        this.audience = process.env.AUTH0_AUDIENCE;
    }
    /**
     * Authorization function that checks an Authorization header string for a valid JWT.
     */
    authorize(authHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateHeader(authHeader);
            const token = this.splitHeader(authHeader);
            const jwtData = this.getJWTData(token);
            const signingKey = yield this.getSigningKey(jwtData.header.kid);
            return new Promise((resolve, reject) => {
                jwt.verify(token, signingKey, this.getOptions(), (err, decoded) => {
                    if (err !== null) {
                        reject(err);
                        return;
                    }
                    const payload = jwt_runtypes_1.RawJwtPayloadRecord.check(decoded);
                    resolve(payload);
                });
            });
        });
    }
    getOptions() {
        return {
            algorithms: this.algorithms,
            audience: this.audience,
            issuer: `https://${this.auth0Domain}/`,
        };
    }
    /**
     * Validates presence of authHeader.
     */
    validateHeader(authHeader) {
        if (authHeader == null) {
            throw new this.errorConstructor("No Authorization header provided.");
        }
        const [type, token] = authHeader.split(" ", 2);
        if (type !== "Bearer" || token == null || token === "") {
            throw new this.errorConstructor("Incorrectly formatted Authorization header.");
        }
    }
    /**
     * Split out "Bearer" and "JWT" from Authorization header.
     */
    splitHeader(authHeader) {
        const [type, token] = authHeader.split(" ", 2);
        return token;
    }
    /**
     * Decodes a JWT.
     */
    getJWTData(token) {
        try {
            const dtoken = jwt.decode(token, { complete: true });
            return jwt_runtypes_1.RawJwtDataRecord.check(dtoken);
        }
        catch (e) {
            throw new this.errorConstructor("Incorrectly formatted JWT.");
        }
    }
    /**
     * Returns the signing key for a given kid.
     */
    getSigningKey(kid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = yield util_1.promisify(jwks_1.jwksClient.getSigningKey)(kid);
                return key.publicKey != null ? key.publicKey : key.rsaPublicKey;
            }
            catch (e) {
                throw new this.errorConstructor("Unable to retrieve public key from kid.");
            }
        });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map