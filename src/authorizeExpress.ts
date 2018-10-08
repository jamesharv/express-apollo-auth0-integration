import * as express from "express";
import { authorize } from "./authorize";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";

/**
 * Middleware to validate a valid JWT in the Authorization header.
 */
export const authorizeExpress = (): express.RequestHandler =>
  async (req, _res, next): Promise<void> => {
    try {
      console.log(req.headers);
      await authorize((req.headers.Authorization as string));
    }
    catch (e) {
      console.error(e);
      throw new GraphqlAuthError();
    }
    next();
  };
