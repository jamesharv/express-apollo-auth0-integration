import { GraphQLObjectType } from "graphql";

/**
 * Extends GraphQLObjectType with some additional properties.
 */
export class ExtendedGraphQLObjectType extends GraphQLObjectType {
  public _authFieldsWrapped: boolean;
  public _requiredAuthRoles: string[];
}
