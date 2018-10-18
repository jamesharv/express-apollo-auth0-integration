
/**
 * ExpressAuthError exception type.
 */
export class ExpressAuthError extends Error {
  public readonly statusCode = 403;

  constructor(message = "You are not authorized") {
    super(message);
  }
}
