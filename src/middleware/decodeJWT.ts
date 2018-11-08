import * as express from "express";
import { ExpressAuthError } from "../exceptions/ExpressAuthError";
import { Auth } from "../model/Auth";
import { RawJwtPayload } from "../model/jwt.runtypes";

export type JWTRequest = express.Request & { jwt: RawJwtPayload };

/**
 * Middleware to decoded the JWT in the Authorization header and add it to request.
 */
export const decodeJWT = (): express.RequestHandler =>
  async (req: JWTRequest, res, next): Promise<void> => {
    try {
      const auth = new Auth(ExpressAuthError);
      req.jwt = await auth.authorize((req.headers.authorization as string));
    }
    catch (e) {
      console.error(e);
    }
    next();
  };
