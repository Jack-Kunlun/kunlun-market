/**
 * 参数转换Pipe
 * 将get请求 query中有可能为number类型的参数转换为number
 */
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ParseNumberPipe implements PipeTransform<any, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    if (metadata.type === "query") {
      return this.parseNumbersInObject(value);
    }

    return value;
  }

  private parseNumbersInObject(obj: any): any {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.parseNumbersInObject(item));
    }

    const parsedObj: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        parsedObj[key] = this.parseNumber(value);
      }
    }

    return parsedObj;
  }

  private parseNumber(value: any): number {
    if (typeof value === "string" && !isNaN(Number(value))) {
      return Number(value);
    }

    return value;
  }
}
