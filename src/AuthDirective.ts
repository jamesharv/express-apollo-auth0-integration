import { SchemaDirectiveVisitor } from "apollo-server";
import { defaultFieldResolver, GraphQLField, GraphQLObjectType } from "graphql";
import { authorize } from "./authorize";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";

/**
 * Auth directive for allowing field level authorization.
 */
export class AuthDirective extends SchemaDirectiveVisitor {
   public visitObject(type): void {
     this.ensureFieldsWrapped(type);
     type._requiredAuthRole = this.args.requires;
   }

   public visitFieldDefinition(field, details): void {
     this.ensureFieldsWrapped(details.objectType);
     field._requiredAuthRole = this.args.requires;
   }

   public async ensureFieldsWrapped(objectType): Promise<void> {
     if (objectType._authFieldsWrapped) {
       return;
     }
     objectType._authFieldsWrapped = true;

     const fields = objectType.getFields();

     Object.keys(fields).forEach((fieldName) => {
       const field = fields[fieldName];
       const { resolve = defaultFieldResolver } = field;
       field.resolve = async function(...args): Promise<any> {
         const requiredRole =
           field._requiredAuthRole ||
           objectType._requiredAuthRole;

         if (! requiredRole) {
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