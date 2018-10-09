"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
/**
 * GraphqlAuthError exception type.
 */
class GraphqlAuthError extends apollo_server_1.AuthenticationError {
    constructor(message = "You are not authorized") {
        super(message);
        this.statusCode = 403;
    }
}
exports.GraphqlAuthError = GraphqlAuthError;
//# sourceMappingURL=GraphqlAuthError.js.map