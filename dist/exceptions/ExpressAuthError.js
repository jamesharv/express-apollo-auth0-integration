"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ExpressAuthError exception type.
 */
class ExpressAuthError extends Error {
    constructor(message = "You are not authorized") {
        super(message);
        this.statusCode = 403;
    }
}
exports.ExpressAuthError = ExpressAuthError;
//# sourceMappingURL=ExpressAuthError.js.map