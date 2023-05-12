import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { loggerWithPublic } from "../../utils/log4js";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly serviceType: ServiceType) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map((data) => {
        const logFormat = ` Request original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  User: ${JSON.stringify(req.user)}
  Response data: ${JSON.stringify(data.data)}`;

        loggerWithPublic(this.serviceType, "info", logFormat);
        loggerWithPublic(this.serviceType, "access", logFormat);

        return data;
      })
    );
  }
}
