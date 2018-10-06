import { AuthenticationError } from "apollo-server";

/**
 * GraphqlAuthError exception type.
 */
export class GraphqlAuthError extends AuthenticationError {
  constructor() {
    super("You are not authorized");
  }
}
