import * as express from "express";
import { authorize } from "./authorize";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";

/**
 * Middleware to validate a valid JWT in the Authorization header.
 */
export const authorizeExpress = (): express.RequestHandler =>
  async (req, res, next): Promise<void> => {
    try {
      await authorize((req.headers.authorization as string));
      next();
    }
    catch (e) {
      res.status(e.statusCode != null ? e.statusCode : 500);
      res.send(JSON.stringify({
        data: null,
        errors: [{
          locations: [],
          message: e.message,
          path: [],
        }],
      }));
      res.end();
    }
  };
