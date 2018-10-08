import * as express from "express";
import { authorize } from "./authorize";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";

/**
 * Middleware to validate a valid JWT in the Authorization header for /graphql.
 */
export const authorizeGraphqlRoute = (): express.RequestHandler =>
  async (req, _res, next): Promise<void> => {
    try {
      await authorize((req.headers.Authorization as string));
    }
    catch (e) {
      throw new GraphqlAuthError();
    }
    next();
  };
