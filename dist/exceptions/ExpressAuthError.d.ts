/**
 * ExpressAuthError exception type.
 */
export declare class ExpressAuthError extends Error {
    readonly statusCode = 403;
    constructor(message?: string);
}
