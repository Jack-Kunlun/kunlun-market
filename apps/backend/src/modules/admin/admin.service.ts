import { AdminUser } from "@entity/admin/admin-user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { encryptPassword, makeSalt } from "@utils/cryptogram";
import { formatResponse } from "@utils/formatResponse";
import { Repository } from "typeorm";

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>
  ) {}

  async findOneById(id: number): Promise<AdminUser | null> {
    try {
      const user = await this.adminUserRepository.findOne({ where: { id } });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByUsername(username: string): Promise<AdminUser | null> {
    try {
      const user = await this.adminUserRepository.findOne({ where: { username } });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async find() {
    try {
      const users = await this.adminUserRepository.find();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async insertOne(params: Omit<AdminUser, "id" | "createTime" | "updateTime" | "passwordSalt" | "roleId">) {
    try {
      const user = await this.findUserByUsername(params.username);

      if (user) {
        return formatResponse({ code: 400, message: "用户已存在", data: null });
      }

      const salt = makeSalt(); // 制作密码盐
      const hashPwd = encryptPassword(params.password, salt); // 加密密码

      await this.adminUserRepository.insert({ ...params, passwordSalt: salt, password: hashPwd });

      return formatResponse();
    } catch (error) {
      throw error;
    }
  }

  async getUserPage({ current, pageSize, username }: PagingParameter & { username?: string }) {
    try {
      const queryBuilder = this.adminUserRepository
        .createQueryBuilder()
        .where("1 = 1")
        .addOrderBy("update_time", "DESC")
        .skip(pageSize * (current - 1))
        .take(pageSize);

      if (username) {
        queryBuilder.andWhere("username = :username", { username });
      }

      const res = await queryBuilder.getManyAndCount();

      return formatResponse({
        data: {
          data: res[0],
          total: res[1],
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
