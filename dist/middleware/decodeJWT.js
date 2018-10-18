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
const ExpressAuthError_1 = require("../exceptions/ExpressAuthError");
const Auth_1 = require("../model/Auth");
/**
 * Middleware to decoded the JWT in the Authorization header and add it to request.
 */
exports.decodeJWT = () => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const auth = new Auth_1.Auth(ExpressAuthError_1.ExpressAuthError);
        req.jwt = yield auth.authorize(req.headers.authorization);
    }
    catch (e) {
        // We don't actually care about errors.
    }
    next();
});
//# sourceMappingURL=decodeJWT.js.map