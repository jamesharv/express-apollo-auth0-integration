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
const chai_1 = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha_typescript_1 = require("mocha-typescript");
const httpMocks = require("node-mocks-http");
const sinon = require("sinon");
const jwks_1 = require("../mocks/jwks");
const keys_1 = require("../mocks/keys");
const tokens_1 = require("../mocks/tokens");
const decodeJWT_1 = require("./decodeJWT");
// tslint:disable:no-unsafe-any
// tslint:disable:deprecation
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
        });
    }
    noAuthHeader() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = sinon.spy();
            yield decodeJWT_1.decodeJWT()(req, res, next);
            chai_1.expect(next.called);
            chai_1.expect(req.jwt).to.equal(undefined);
        });
    }
    invalidAuthHeaderError() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = httpMocks.createRequest({
                headers: {
                    authorization: "Bearer eyabc",
                },
            });
            const res = httpMocks.createResponse();
            const next = sinon.spy();
            yield decodeJWT_1.decodeJWT()(req, res, next);
            chai_1.expect(next.called);
            chai_1.expect(req.jwt).to.equal(undefined);
        });
    }
    validAuthHeader() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = httpMocks.createRequest({
                headers: {
                    authorization: `Bearer ${this.jwt}`,
                },
            });
            const res = httpMocks.createResponse();
            const next = sinon.spy();
            yield decodeJWT_1.decodeJWT()(req, res, next);
            chai_1.expect(next.called);
            chai_1.expect(req.jwt).to.deep.equal(tokens_1.decoded.payload);
        });
    }
};
__decorate([
    mocha_typescript_1.test("No Auth header does nothing"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizeSpec.prototype, "noAuthHeader", null);
__decorate([
    mocha_typescript_1.test("Invalid Auth header does nothing"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizeSpec.prototype, "invalidAuthHeaderError", null);
__decorate([
    mocha_typescript_1.test("Valid Auth header adds decoded JWT to request"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizeSpec.prototype, "validAuthHeader", null);
AuthorizeSpec = __decorate([
    mocha_typescript_1.suite(mocha_typescript_1.timeout(300), mocha_typescript_1.slow(50))
], AuthorizeSpec);
exports.AuthorizeSpec = AuthorizeSpec;
//# sourceMappingURL=decodeJWT.spec.js.map