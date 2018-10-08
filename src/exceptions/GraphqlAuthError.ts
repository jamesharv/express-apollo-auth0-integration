import { AuthenticationError } from "apollo-server";

/**
 * GraphqlAuthError exception type.
 */
export class GraphqlAuthError extends AuthenticationError {
  constructor(message = "You are not authorized") {
    super(message);
  }
}
