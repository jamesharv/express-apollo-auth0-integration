import { AuthenticationError } from "apollo-server";

/**
 * GraphqlAuthError exception type.
 */
export class GraphqlAuthError extends AuthenticationError {
  public readonly statusCode = 403;

  constructor(message = "You are not authorized") {
    super(message);
  }
}
