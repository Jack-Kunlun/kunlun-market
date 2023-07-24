import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { formatResponse } from "@utils/formatResponse";
import { instanceToPlain } from "class-transformer";
import { AdminUser } from "../../entity/admin/admin-user.entity";
import { encryptPassword } from "../../utils/cryptogram";
import { AdminUserService } from "../admin/admin.service";
import { UserService } from "../user/user.service";
import { JwtPayload } from "./types";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  /**
   * 校验管理平台用户信息
   */
  async validateAdminUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.adminUserService.findUserByUsername(username);

      if (!user) {
        return formatResponse({ code: 400, message: "用户不存在" });
      }

      const hashPassword = encryptPassword(password, user.passwordSalt);

      if (hashPassword !== user.password) {
        return formatResponse({ code: 400, message: "密码不正确" });
      }

      return formatResponse({ data: user });
    } catch (error) {
      throw error;
    }
  }

  /**
   * 校验用户信息
   */
  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUserByUsername(username);

      if (!user) {
        return formatResponse({ code: 400, message: "用户不存在" });
      }

      const hashPassword = encryptPassword(password, user.passwordSalt);

      if (hashPassword !== user.password) {
        return formatResponse({ code: 400, message: "密码不正确" });
      }

      return formatResponse({ data: user });
    } catch (error) {
      throw error;
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: AdminUser, serviceType: ServiceType) {
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
      roleId: user.roleId,
      realName: user.realName,
      serviceType,
    };

    try {
      const token = this.jwtService.sign(payload);

      return formatResponse({ data: { ...instanceToPlain(user), token } });
    } catch (error) {
      throw error;
    }
  }
}
