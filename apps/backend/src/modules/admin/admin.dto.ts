import { IsNotEmpty, IsString } from "class-validator";
import { PagingParameterDto } from "src/dto/pagingParameter.dto";

export class RegisterAdminUserInfoDto {
  @IsString()
  @IsNotEmpty({ message: "用户名不能为空" })
  readonly username: string;

  @IsNotEmpty({ message: "真实姓名不能为空" })
  @IsString()
  readonly realName: string;

  @IsNotEmpty({ message: "密码不能为空" })
  @IsString()
  readonly password: string;

  @IsNotEmpty({ message: "手机号不能为空" })
  @IsString()
  readonly phone: string;

  readonly email?: string;
}

export class AdminUserLoginDto {
  @IsString()
  @IsNotEmpty({ message: "用户名不能为空" })
  readonly username: string;

  @IsString()
  @IsNotEmpty({ message: "密码不能为空" })
  readonly password: string;
}

export class AdminUserPagingParameter extends PagingParameterDto {
  @IsString()
  username: string;
}
