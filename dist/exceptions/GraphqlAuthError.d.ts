import { AuthenticationError } from "apollo-server";
/**
 * GraphqlAuthError exception type.
 */
export declare class GraphqlAuthError extends AuthenticationError {
    readonly statusCode = 403;
    constructor(message?: string);
}
