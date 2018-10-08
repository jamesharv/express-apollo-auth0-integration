import { AuthenticationError } from "apollo-server";
/**
 * GraphqlAuthError exception type.
 */
export declare class GraphqlAuthError extends AuthenticationError {
    readonly statusCode = 500;
    constructor(message?: string);
}
