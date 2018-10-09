import { SchemaDirectiveVisitor } from "apollo-server";
import { GraphQLField } from "graphql";
import { ExtendedGraphQLObjectType } from "./ExtendedGraphQLObjectType";
/**
 * Auth directive for allowing field level authorization.
 */
export declare class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(field: ExtendedGraphQLObjectType): void;
    visitFieldDefinition(field: GraphQLField<any, any>, details: {
        objectType: ExtendedGraphQLObjectType;
    }): void;
    ensureFieldsWrapped(objectType: ExtendedGraphQLObjectType): void;
}
