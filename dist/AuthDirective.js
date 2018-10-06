"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
/**
 * Auth directive for allowing field level authorization.
 */
class AuthDirective extends apollo_server_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const scopes = this.args.scopes;
        console.log(scopes);
        console.log(field);
    }
}
exports.AuthDirective = AuthDirective;
//# sourceMappingURL=AuthDirective.js.map