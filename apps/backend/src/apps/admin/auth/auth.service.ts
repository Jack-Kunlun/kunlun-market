import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { instanceToPlain } from "class-transformer";
import { AdminUser } from "../../../entity/admin/admin-user.entity";
import { encryptPassword } from "../../../utils/cryptogram";
import { UserService } from "../user/user.service";
import { JwtPayload } from "./types";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUserByUsername(username);

      if (!user) {
        return {
          code: 400,
          message: "账号或密码错误",
        };
      }

      const hashPassword = encryptPassword(password, user.passwordSalt);

      if (hashPassword !== user.password) {
        return {
          code: 400,
          message: "账号或密码错误",
        };
      }

      return { code: 200, data: user };
    } catch (error) {
      return error;
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: AdminUser) {
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
      roleId: user.roleId,
      realName: user.realName,
    };

    try {
      const token = this.jwtService.sign(payload);

      return {
        code: 200,
        data: {
          ...instanceToPlain(user),
          token,
        },
        msg: "登录成功",
      };
    } catch (error) {
      return {
        code: 400,
        message: "账号或密码错误",
      };
    }
  }
}
