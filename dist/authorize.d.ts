/**
 * Authorize function.
 *
 * Takes an Authorization header in the form of `Bearer ey...` and performs auth.
 *
 * @TODO scope authorization.
 */
export declare const authorize: (authHeader: string, scopes?: string[]) => Promise<any>;
