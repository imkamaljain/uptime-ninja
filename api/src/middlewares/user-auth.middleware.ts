import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Response } from "express";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedException("Missing or invalid token");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return next(new UnauthorizedException("Auth token not found"));
      }

      const decoded: any = await this.authService.verifyToken(token);

      req["user"] = decoded;
      return next();
    } catch (error) {
      return next(new UnauthorizedException(error.message));
    }
  }
}
