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
const apollo_server_1 = require("apollo-server");
const chai_1 = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha_typescript_1 = require("mocha-typescript");
const jwks_1 = require("../mocks/jwks");
const keys_1 = require("../mocks/keys");
const tokens_1 = require("../mocks/tokens");
const Auth_1 = require("./Auth");
// tslint:disable:no-unsafe-any
// tslint:disable:deprecation
// tslint:disable:max-line-length
chai_1.use(chaiAsPromised);
/**
 * Tests for JWT Authorization.
 */
let AuthorizeSpec = class AuthorizeSpec {
    /**
     * Tests for JWT Authorization.
     */
    constructor() {
        this.jwksHost = "https://test.foo.com";
    }
    before() {
        return __awaiter(this, void 0, void 0, function* () {
            process.env.AUTH0_DOMAIN = "test.foo.com";
            process.env.AUTH0_AUDIENCE = "test.foo.com";
            this.jwt = tokens_1.createToken(keys_1.privateKey, "a1bc", tokens_1.decoded.payload);
            jwks_1.jwksEndpoint(this.jwksHost, [{ pub: keys_1.publicKey, kid: "a1bc" }]);
            this.auth = new Auth_1.Auth();
        });
    }
    noAuthHeaderError() {
        return __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(this.auth.authorize(null)).to.eventually.throw(apollo_server_1.AuthenticationError, "No Authorization header provided.");
        });
    }
    invalidAuthHeaderError() {
        return __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(this.auth.authorize("Not a Header"))
                .to.eventually.throw(apollo_server_1.AuthenticationError, "Incorrectly formatted Authorization header.");
            chai_1.expect(this.auth.authorize("bearer foo"))
                .to.eventually.throw(apollo_server_1.AuthenticationError, "Incorrectly formatted Authorization header.");
            chai_1.expect(this.auth.authorize("Bearer"))
                .to.eventually.throw(apollo_server_1.AuthenticationError, "Incorrectly formatted Authorization header.");
        });
    }
    decodeValidJWT() {
        return __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(this.auth.authorize(`Bearer ${this.jwt}`))
                .to.eventually.deep.equal(tokens_1.decoded.payload);
        });
    }
};
__decorate([
    mocha_typescript_1.test("No Auth header throws error"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizeSpec.prototype, "noAuthHeaderError", null);
__decorate([
    mocha_typescript_1.test("Invalid Auth header throws error"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizeSpec.prototype, "invalidAuthHeaderError", null);
__decorate([
    mocha_typescript_1.test("It decodes a valid JWT"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizeSpec.prototype, "decodeValidJWT", null);
AuthorizeSpec = __decorate([
    mocha_typescript_1.suite(mocha_typescript_1.timeout(300), mocha_typescript_1.slow(50))
], AuthorizeSpec);
exports.AuthorizeSpec = AuthorizeSpec;
//# sourceMappingURL=Auth.spec.js.map