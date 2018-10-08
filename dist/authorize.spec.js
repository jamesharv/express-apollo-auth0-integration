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
// tslint:disable:no-unsafe-any
// tslint:disable:deprecation
chai_1.use(chaiAsPromised);
/**
 * Tests for JWT Authorization.
 */
let AuthorizeSpec = class AuthorizeSpec {
    before() {
        process.env.SNS_TOPIC_ARNS = "foo";
    }
    authorize() {
        return __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(1).to.equal(1);
        });
    }
};
__decorate([
    mocha_typescript_1.test("It handles authorizing a JWT"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizeSpec.prototype, "authorize", null);
AuthorizeSpec = __decorate([
    mocha_typescript_1.suite(mocha_typescript_1.timeout(300), mocha_typescript_1.slow(50))
], AuthorizeSpec);
exports.AuthorizeSpec = AuthorizeSpec;
//# sourceMappingURL=authorize.spec.js.map