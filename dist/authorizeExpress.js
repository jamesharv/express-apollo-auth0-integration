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
const authorize_1 = require("./authorize");
/**
 * Middleware to validate a valid JWT in the Authorization header.
 */
exports.authorizeExpress = () => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log(req.headers);
        yield authorize_1.authorize(req.headers.Authorization);
        next();
    }
    catch (e) {
        console.error(e);
        res.status(e.statusCode != null ? e.statusCode : 500);
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
});
//# sourceMappingURL=authorizeExpress.js.map