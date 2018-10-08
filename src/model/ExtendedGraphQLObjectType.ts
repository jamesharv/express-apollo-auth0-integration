import { GraphQLObjectType } from "graphql";

/**
 * Extends GraphQLObjectType with some additional properties.
 */
export class ExtendedGraphQLObjectType extends GraphQLObjectType {
  public _requiredAuthRole: string;
  public _authFieldsWrapped: boolean;
}
