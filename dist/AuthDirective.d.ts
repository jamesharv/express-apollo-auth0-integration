import { SchemaDirectiveVisitor } from "apollo-server";
/**
 * Auth directive for allowing field level authorization.
 */
export declare class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type: any): void;
    visitFieldDefinition(field: any, details: any): void;
    ensureFieldsWrapped(objectType: any): Promise<void>;
}
