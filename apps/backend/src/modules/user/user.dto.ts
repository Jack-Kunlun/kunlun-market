import { IsString, IsNotEmpty } from "class-validator";

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
