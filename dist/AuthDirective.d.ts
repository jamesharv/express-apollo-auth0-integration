import { SchemaDirectiveVisitor } from "apollo-server";
import { GraphQLField } from "graphql";
/**
 * Auth directive for allowing field level authorization.
 */
export declare class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>): void;
}
