import * as express from "express";
import { RawJwtPayload } from "../model/jwt.runtypes";
export declare type JWTRequest = express.Request & {
    jwt: RawJwtPayload;
};
/**
 * Middleware to decoded the JWT in the Authorization header and add it to request.
 */
export declare const decodeJWT: () => express.RequestHandler;
