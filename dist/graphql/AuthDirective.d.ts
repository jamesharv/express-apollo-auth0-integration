import { SchemaDirectiveVisitor } from "apollo-server";
/**
 * Interface defining input for the AuthDirective.
 */
interface AuthDirectiveInput {
    rolesCb: (userUUID: string, portalUUID: string) => Promise<string[]>;
    authHeaderCb: (graphQLContext: any) => Promise<string>;
}
/**
 * Auth directive for allowing field level authorization.
 */
export declare const AuthDirective: (input: AuthDirectiveInput) => typeof SchemaDirectiveVisitor;
export {};