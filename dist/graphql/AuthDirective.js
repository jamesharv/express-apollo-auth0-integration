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
const Auth_1 = require("../model/Auth");
/**
 * Auth directive for allowing field level authorization.
 */
exports.AuthDirective = (input) => class extends apollo_server_1.SchemaDirectiveVisitor {
    static getDirectiveDeclaration(directiveName, schema) {
        return new graphql_1.GraphQLDirective({
            args: {
                roles: {
                    type: new graphql_1.GraphQLList(schema.getType("Role")),
                },
            },
            locations: [
                graphql_1.DirectiveLocation.OBJECT,
                graphql_1.DirectiveLocation.FIELD_DEFINITION,
            ],
            name: directiveName,
        });
    }
    visitObject(object) {
        this.ensureFieldsWrapped(object);
        object._requiredAuthRoles = this.args.roles;
    }
    visitFieldDefinition(field, details) {
        field._markedAsAuthRequired = true;
        this.ensureFieldsWrapped(details.objectType);
        field._requiredAuthRoles = this.args.roles;
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
                    const requiredRoles = (field._requiredAuthRoles !== undefined) ?
                        field._requiredAuthRoles : objectType._requiredAuthRoles;
                    if (!field._markedAsAuthRequired && requiredRoles === undefined) {
                        return resolve.apply(this, args);
                    }
                    const auth = new Auth_1.Auth();
                    const decoded = yield auth.authorize(input.authHeader);
                    // Handle authorization to check if user has required roles.
                    const currentUserRoles = yield input.rolesCb(decoded["http://getequiem.com/user"], decoded["http://getequiem.com/portal"]);
                    if (currentUserRoles.filter((role) => -1 !== requiredRoles.indexOf(role)).length === 0) {
                        throw new apollo_server_1.AuthenticationError("User does not have correct roles!");
                    }
                    return resolve.apply(this, args);
                });
            };
        });
    }
};
//# sourceMappingURL=AuthDirective.js.map