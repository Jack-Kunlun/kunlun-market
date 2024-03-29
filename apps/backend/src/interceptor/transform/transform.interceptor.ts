import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { customLogger } from "../../utils";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map((data) => {
        const logFormat = `Request original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  User: ${JSON.stringify(req.user)}
  Response data: ${JSON.stringify(data.data)}`;

        customLogger.info(logFormat);
        customLogger.access(logFormat);

        return data;
      })
    );
  }
}
