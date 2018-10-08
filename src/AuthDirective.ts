import { SchemaDirectiveVisitor } from "apollo-server";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { authorize } from "./authorize";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";
import { ExtendedGraphQLObjectType } from "./model/ExtendedGraphQLObjectType";

// Extension of GraphQL Field with addition type info.
interface ExtendedGrapQLField<TSource, TContext> extends GraphQLField<TSource, TContext> {
  _requiredAuthRole: string;
}

/**
 * Auth directive for allowing field level authorization.
 */
export class AuthDirective extends SchemaDirectiveVisitor {
   public visitObject(field: ExtendedGraphQLObjectType): void {
     this.ensureFieldsWrapped(field);
     field._requiredAuthRole = (this.args.requires as string);
   }

   public visitFieldDefinition(field: ExtendedGrapQLField<any, any>,
                               details: { objectType: ExtendedGraphQLObjectType }): void {
     this.ensureFieldsWrapped(details.objectType);
     field._requiredAuthRole = (this.args.requires as string);
   }

   public ensureFieldsWrapped(objectType: ExtendedGraphQLObjectType): void {
     if (objectType._authFieldsWrapped) {
       return;
     }
     objectType._authFieldsWrapped = true;

     const fields = objectType.getFields();

     Object.keys(fields).forEach((fieldName) => {
       const field = (fields[fieldName] as ExtendedGrapQLField<any, any>);
       const { resolve = defaultFieldResolver } = field;
       field.resolve = async function(...args): Promise<any> {
         const requiredRole = field._requiredAuthRole !== null ? field._requiredAuthRole : objectType._requiredAuthRole;

         if (requiredRole == null) {
           return resolve.apply(this, args);
         }

         const context = args[2];
         try {
           await authorize("Bearer foo");
         }
         catch (e) {
           throw new GraphqlAuthError();
         }

         return resolve.apply(this, args);
       };
     });
   }
 }
