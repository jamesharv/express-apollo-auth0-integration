import { SchemaDirectiveVisitor } from "apollo-server";
import { RawJwtPayload } from "../model/jwt.runtypes";
/**
 * Interface defining input for the AuthDirective.
 */
interface AuthDirectiveInput {
    rolesCb: (decodedJWT: RawJwtPayload) => Promise<string[]>;
    authHeaderCb: (graphQLContext: any) => Promise<string>;
}
/**
 * Auth directive for allowing field level authorization.
 */
export declare const AuthDirective: (input: AuthDirectiveInput) => typeof SchemaDirectiveVisitor;
export {};
