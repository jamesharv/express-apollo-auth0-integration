import { AuthenticationError } from "apollo-server";
/**
 * GraphqlAuthError exception type.
 */
export declare class GraphqlAuthError extends AuthenticationError {
    constructor(message?: string);
}
