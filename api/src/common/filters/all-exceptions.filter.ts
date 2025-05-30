import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ThrottlerException } from "@nestjs/throttler";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    switch (true) {
      case exception instanceof ThrottlerException:
        response.status(HttpStatus.TOO_MANY_REQUESTS).json({
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: request.url.includes("verifyEmail")
            ? "Too many OTP requests. Please wait 30 seconds before trying again."
            : "You are being rate limited. Please try again later.",
          error: "Rate limit exceeded",
        });
        break;
      case exception instanceof HttpException:
        response.status(exception.getStatus()).json({
          statusCode: exception.getStatus(),
          message:
            (exception.getResponse() as any).message || exception.message,
          error: (exception.getResponse() as any).error || exception.message,
        });
        break;
    }
  }
}
