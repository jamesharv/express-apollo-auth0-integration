import { GraphQLObjectType } from "graphql";
/**
 * Extends GraphQLObjectType with some additional properties.
 */
export declare class ExtendedGraphQLObjectType extends GraphQLObjectType {
    _requiredAuthRole: string;
    _authFieldsWrapped: boolean;
}
