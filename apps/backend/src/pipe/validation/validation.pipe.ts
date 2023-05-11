import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { loggerError } from "../../utils";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 如果没有传入验证规则，则不验证，直接返回数据
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const msg = errors[0].constraints ? Object.values(errors[0].constraints)[0] : ""; // 只需要取第一个错误信息并返回即可

      loggerError(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
}
