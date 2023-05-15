import { AdminUser } from "@entity/admin/admin-user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { encryptPassword, makeSalt } from "@utils/cryptogram";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>
  ) {}

  async findOneById(id: number): Promise<AdminUser> {
    try {
      const user = await this.adminUserRepository.findOne({ where: { id } });

      if (!user) {
        throw "error";
      }

      return user;
    } catch (error) {
      return error;
    }
  }

  async findUserByUsername(username: string): Promise<AdminUser | null> {
    try {
      const user = await this.adminUserRepository.findOne({ where: { username } });

      return user;
    } catch (error) {
      return error;
    }
  }

  async find() {
    try {
      const users = await this.adminUserRepository.find();

      return users;
    } catch (error) {}
  }

  async insertOne(params: Omit<AdminUser, "id" | "createTime" | "updateTime" | "passwordSalt">) {
    try {
      const user = await this.findUserByUsername(params.username);

      if (user) {
        return {
          code: 400,
          msg: "用户已存在",
        };
      }

      const salt = makeSalt(); // 制作密码盐
      const hashPwd = encryptPassword(params.password, salt); // 加密密码

      const result = await this.adminUserRepository.insert({ ...params, passwordSalt: salt, password: hashPwd });

      return result;
    } catch (error) {
      return error;
    }
  }
}
