import * as express from "express";
import { ExpressAuthError } from "../exceptions/ExpressAuthError";
import { Auth } from "../model/Auth";

/**
 * Middleware to validate a valid JWT in the Authorization header.
 */
export const authorizeExpress = (): express.RequestHandler =>
  async (req, res, next): Promise<void> => {
    try {
      const auth = new Auth(ExpressAuthError);
      await auth.authorize((req.headers.authorization as string));
      next();
    }
    catch (e) {
      if (e instanceof ExpressAuthError) {
        res.status(e.statusCode);
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
      else {
        // We don't actually care if the error isn't a GraphQL error.
        next();
      }
    }
  };
