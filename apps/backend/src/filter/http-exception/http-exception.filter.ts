import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { loggerWithPublic } from "../../utils";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly serviceType: ServiceType) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logFormat = `Request original url: ${request.originalUrl}
  Method: ${request.method}
  IP: ${request.ip}
  Status code: ${status}
  Response: ${exception.toString()}`;

    loggerWithPublic(this.serviceType, "warn", logFormat);

    response.status(status).json({
      statusCode: status,
      error: exception.message,
      message: `${status >= 500 ? "Service Error" : "Client Error"}`,
    });
  }
}
