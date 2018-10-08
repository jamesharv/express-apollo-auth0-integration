import * as express from "express";
/**
 * Middleware to validate a valid JWT in the Authorization header for /graphql.
 */
export declare const authorizeGraphqlRoute: () => express.RequestHandler;
