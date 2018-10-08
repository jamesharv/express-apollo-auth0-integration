import { SchemaDirectiveVisitor } from "apollo-server";
import { GraphQLField } from "graphql";
import { ExtendedGraphQLObjectType } from "./model/ExtendedGraphQLObjectType";
interface ExtendedGrapQLField<TSource, TContext> extends GraphQLField<TSource, TContext> {
    _requiredAuthRole: string;
}
/**
 * Auth directive for allowing field level authorization.
 */
export declare class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(field: ExtendedGraphQLObjectType): void;
    visitFieldDefinition(field: ExtendedGrapQLField<any, any>, details: {
        objectType: ExtendedGraphQLObjectType;
    }): void;
    ensureFieldsWrapped(objectType: ExtendedGraphQLObjectType): void;
}
export {};
