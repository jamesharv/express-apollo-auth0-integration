import * as express from "express";
import { Auth } from "../model/Auth";
import { RawJwtPayload } from "../model/jwt.runtypes";

export type JWTRequest = express.Request & { jwt: RawJwtPayload };

/**
 * Middleware to decoded the JWT in the Authorization header and add it to request.
 */
export const decodeJWT = (): express.RequestHandler =>
  async (req: JWTRequest, res, next): Promise<void> => {
    try {
      const auth = new Auth();
      req.jwt = await auth.authorize((req.headers.authorization as string));
    }
    catch (e) {
      // We don't actually care about errors.
    }
    next();
  };
