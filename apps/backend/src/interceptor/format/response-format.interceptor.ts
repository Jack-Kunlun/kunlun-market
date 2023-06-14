import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface Response<T = any> {
  code: 200;
  message: "success";
  data: T;
}

/**
 * 全局响应数据拦截器
 * 正确时只需要返回data
 * 有错误时需要返回code和message
 */
@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Response> | Promise<Observable<Response>> {
    return next.handle().pipe(
      map((data) => {
        const code = data?.code || 200;

        const message = data?.message || "Success";

        if (code !== 200) {
          return {
            code,
            message,
            data: null,
          };
        }

        return {
          code,
          message,
          data,
        };
      })
    );
  }
}
