"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const util_1 = require("util");
const GraphqlAuthError_1 = require("../exceptions/GraphqlAuthError");
const jwt_runtypes_1 = require("./jwt.runtypes");
/**
 * Auth class for handling JWT validation and decoding.
 */
let Auth = class Auth {
    constructor() {
        this.algorithms = ["RS256"];
        this.auth0Domain = process.env.AUTH0_AUDIENCE;
        this.audience = process.env.AUTH0_DOMAIN;
    }
    /**
     * Authorization function that checks an authHeader and optional scopes.
     */
    authorize(authHeader, scopes = []) {
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
    splitHeader(authHeader) {
        // Split out "Bearer" from "JWT" in Authorization header.
        const [type, token] = authHeader.split(" ", 2);
        if (type !== "Bearer" || token == null || token === "") {
            throw new GraphqlAuthError_1.GraphqlAuthError("Incorrectly formatted Authorization header.");
        }
        return token;
    }
    validateHeader(authHeader) {
        if (authHeader == null) {
            throw new GraphqlAuthError_1.GraphqlAuthError("No Authorization header provided.");
        }
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
            throw new GraphqlAuthError_1.GraphqlAuthError("Incorrectly formatted JWT.");
        }
    }
    /**
     * Returns the signing key for a given kid.
     */
    getSigningKey(kid) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = jwks({
                cache: true,
                jwksRequestsPerMinute: 10,
                jwksUri: `https://${this.auth0Domain}/.well-known/jwks.json`,
                rateLimit: true,
            });
            try {
                const key = yield util_1.promisify(client.getSigningKey)(kid);
                return key.publicKey != null ? key.publicKey : key.rsaPublicKey;
            }
            catch (e) {
                throw new GraphqlAuthError_1.GraphqlAuthError("Unable to retrieve public key from kid.");
            }
        });
    }
};
Auth = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map