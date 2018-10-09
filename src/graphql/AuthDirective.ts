import { SchemaDirectiveVisitor } from "apollo-server";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { Container } from "inversify";
import { GraphqlAuthError } from "../exceptions/GraphqlAuthError";
import { Auth } from "../model/Auth";
import { ExtendedGraphQLObjectType } from "./ExtendedGraphQLObjectType";

/**
 * Auth directive for allowing field level authorization.
 */
export class AuthDirective extends SchemaDirectiveVisitor {
   public visitObject(field: ExtendedGraphQLObjectType): void {
     this.ensureFieldsWrapped(field);
   }

   public visitFieldDefinition(field: GraphQLField<any, any>,
                               details: { objectType: ExtendedGraphQLObjectType }): void {
     this.ensureFieldsWrapped(details.objectType);
   }

   public ensureFieldsWrapped(objectType: ExtendedGraphQLObjectType): void {
     if (objectType._authFieldsWrapped) {
       return;
     }
     objectType._authFieldsWrapped = true;

     const fields = objectType.getFields();

     Object.keys(fields).forEach((fieldName) => {
       const field = fields[fieldName];
       const { resolve = defaultFieldResolver } = field;
       field.resolve = async function(...args): Promise<any> {
         const context = args[2];
         const auth = new Auth();
         await auth.authorize("Bearer foo");

         return resolve.apply(this, args);
       };
     });
   }
 }
