import * as express from "express";
import { authorize } from "./authorize";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";

/**
 * Middleware to validate a valid JWT in the Authorization header.
 */
export const authorizeExpress = (): express.RequestHandler =>
  (req, _res, next): void => {
    try {
      authorize((req.headers.Authorization as string));
    }
    catch (e) {
      throw new GraphqlAuthError();
    }
    next();
  };
