/**
 * User service.
 */
import { User } from "@entity/frontend/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { encryptPassword, formatResponse, makeSalt } from "@utils/index";
import { Like, Repository } from "typeorm";

interface UserPageParams extends PagingParameter {
  username?: string;
  realName?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findUserByUsername(username: string) {
    try {
      const user = await this.userRepository.findOne({ where: { username } });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserPage({ current, pageSize, username, realName }: UserPageParams) {
    try {
      const [users, total] = await this.userRepository.findAndCount({
        where: {
          username: username ? Like(`%${username}%`) : Like("%%"),
          realName: realName ? Like(`%${realName}%`) : Like("%%"),
        },
        skip: (current - 1) * pageSize,
        take: pageSize,
      });

      return formatResponse({ data: { data: users, total } });
    } catch (error) {
      throw error;
    }
  }

  async register(user: Omit<User, "id" | "createTime" | "updateTime" | "passwordSalt" | "roleId">) {
    try {
      const result = await this.findUserByUsername(user.username);

      if (result) {
        return formatResponse({ code: 400, message: "用户名已存在", data: null });
      }

      const salt = makeSalt(); // 制作密码盐
      const hashPwd = encryptPassword(user.password, salt); // 加密密码

      await this.userRepository.insert({ ...user, passwordSalt: salt, password: hashPwd });

      return formatResponse();
    } catch (error) {
      throw error;
    }
  }
}
