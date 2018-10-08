import { AuthenticationError } from "apollo-server";
import * as express from "express";
import { GraphqlAuthError } from "./exceptions/GraphqlAuthError";
import { Auth } from "./model/Auth";

/**
 * Middleware to validate a valid JWT in the Authorization header.
 */
export const authorizeExpress = (): express.RequestHandler =>
  async (req, res, next): Promise<void> => {
    try {
      const auth = new Auth();
      await auth.authorize((req.headers.authorization as string));
      next();
    }
    catch (e) {
      if (e instanceof GraphqlAuthError) {
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
        next();
      }
    }
  };
