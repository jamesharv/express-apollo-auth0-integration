import * as express from "express";
/**
 * Middleware to validate a valid JWT in the Authorization header.
 */
export declare const authorizeExpress: () => express.RequestHandler;
