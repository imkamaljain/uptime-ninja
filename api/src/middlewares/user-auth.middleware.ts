import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    req["user"] = {
      id: 1,
    };
    return next();
    // const { authToken } = req["cookies"];
    // if (!authToken) {
    //   return next(new UnauthorizedException(ErrorMessage.SESSION_ID_NOT_FOUND));
    // }
    // const [activeSession, isValidSession] = await Promise.all([
    //   this.redisClientService.get(`session:${authToken}`),
    //   Promise.resolve(this.authUtils.verifySignedSessionId(authToken)),
    // ]);
    // if (!activeSession || !isValidSession) {
    //   return next(new UnauthorizedException(ErrorMessage.SESSION_EXPIRED));
    // }
    // try {
    //   // const sessionData = JSON.parse(activeSession);
    //   req.user = {
    //     ...sessionData.user,
    //     workspace,
    //   };
    //   return next();
    // } catch (error) {
    //   return next(
    //     new UnauthorizedException(
    //       error.message || ErrorMessage.SESSION_INVALID,
    //     ),
    //   );
    // }
  }
}
