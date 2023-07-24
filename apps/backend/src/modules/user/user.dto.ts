import { IsString, IsNotEmpty } from "class-validator";
import { PagingParameterDto } from "src/dto/pagingParameter.dto";

export class UserLoginDto {
  @IsString()
  @IsNotEmpty({ message: "用户名不能为空" })
  readonly username: string;

  @IsString()
  @IsNotEmpty({ message: "密码不能为空" })
  readonly password: string;

  @IsString()
  @IsNotEmpty({ message: "验证码不能为空" })
  readonly code: string;
}

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty({ message: "用户名不能为空" })
  readonly username: string;

  @IsString()
  @IsNotEmpty({ message: "昵称不能为空" })
  readonly realName: string;

  @IsString()
  @IsNotEmpty({ message: "密码不能为空" })
  readonly password: string;

  @IsString()
  @IsNotEmpty({ message: "手机号不能为空" })
  readonly phone: string;

  @IsString()
  @IsNotEmpty({ message: "邮箱不能为空" })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: "验证码不能为空" })
  readonly code: string;
}

export class UserPageParameterDto extends PagingParameterDto {
  username?: string;

  realName?: string;
}
