import { SchemaDirectiveVisitor } from "apollo-server";
import { defaultFieldResolver, GraphQLField } from "graphql";

/**
 * Auth directive for allowing field level authorization.
 */
export class AuthDirective extends SchemaDirectiveVisitor {

  public visitFieldDefinition(field: GraphQLField<any, any>): void {
    const scopes = this.args.scopes;
    console.log(scopes);
    console.log(field);
  }
}
