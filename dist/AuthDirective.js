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
const apollo_server_1 = require("apollo-server");
const graphql_1 = require("graphql");
const GraphqlAuthError_1 = require("./exceptions/GraphqlAuthError");
const Auth_1 = require("./model/Auth");
/**
 * Auth directive for allowing field level authorization.
 */
class AuthDirective extends apollo_server_1.SchemaDirectiveVisitor {
    visitObject(field) {
        this.ensureFieldsWrapped(field);
        field._requiredAuthRole = this.args.requires;
    }
    visitFieldDefinition(field, details) {
        this.ensureFieldsWrapped(details.objectType);
        field._requiredAuthRole = this.args.requires;
    }
    ensureFieldsWrapped(objectType) {
        if (objectType._authFieldsWrapped) {
            return;
        }
        objectType._authFieldsWrapped = true;
        const fields = objectType.getFields();
        Object.keys(fields).forEach((fieldName) => {
            const field = fields[fieldName];
            const { resolve = graphql_1.defaultFieldResolver } = field;
            field.resolve = function (...args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const requiredRole = field._requiredAuthRole !== null ? field._requiredAuthRole : objectType._requiredAuthRole;
                    if (requiredRole == null) {
                        return resolve.apply(this, args);
                    }
                    const context = args[2];
                    try {
                        const auth = new Auth_1.Auth();
                        yield auth.authorize("Bearer foo");
                    }
                    catch (e) {
                        throw new GraphqlAuthError_1.GraphqlAuthError();
                    }
                    return resolve.apply(this, args);
                });
            };
        });
    }
}
exports.AuthDirective = AuthDirective;
//# sourceMappingURL=AuthDirective.js.map