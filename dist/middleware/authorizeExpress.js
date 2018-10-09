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
const GraphqlAuthError_1 = require("../exceptions/GraphqlAuthError");
const Auth_1 = require("../model/Auth");
/**
 * Middleware to validate a valid JWT in the Authorization header.
 */
exports.authorizeExpress = () => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const auth = new Auth_1.Auth();
        yield auth.authorize(req.headers.authorization);
        next();
    }
    catch (e) {
        if (e instanceof GraphqlAuthError_1.GraphqlAuthError) {
            res.status(e.statusCode);
            res.send(JSON.stringify({
                data: null,
                errors: [{
                        locations: [],
                        message: e.message,
                        path: [],
                    }],
            }));
            res.end();
        }
        else {
            // We don't actually care if the error isn't a GraphQL error.
            next();
        }
    }
});
//# sourceMappingURL=authorizeExpress.js.map