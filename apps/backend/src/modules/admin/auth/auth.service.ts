import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminUser } from "../../../entity/admin/admin.entity";
import { encryptPassword } from "../../../utils/cryptogram";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AdminService } from "../admin/admin.service";
import { JwtPayload } from "./types";

@Injectable()
export class AuthService {
  constructor(private readonly AdminService: AdminService, private readonly jwtService: JwtService) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.AdminService.findUserByUsername(username);

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
          ...user,
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
