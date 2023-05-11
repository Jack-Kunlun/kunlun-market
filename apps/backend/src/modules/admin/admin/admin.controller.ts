import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { Public } from "../../../decorator/public.decorator";
import { AdminUser } from "../../../entity/admin/admin.entity";
import { AuthService } from "../auth/auth.service";
import { RegisterInfoDTO } from "./admin.dto";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return "this.appService.getHello()";
  }

  @Get("user")
  findUser() {
    return this.adminService.find();
  }

  @Get("user/:id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOneById(+id);
  }

  @Post("add")
  insertOne(@Body() body: Omit<AdminUser, "id" | "createTime" | "updateTime" | "passwordSalt">) {
    return this.adminService.insertOne(body);
  }

  @Post("register")
  @Public()
  register(@Body() body: RegisterInfoDTO) {
    return { code: 200, data: body };
  }

  @Post("login")
  @Public()
  async login(@Body() { username, password }: { username: string; password: string }) {
    try {
      const authResult = await this.authService.validateUser(username, password);

      if (authResult.code === 200) {
        return await this.authService.certificate(authResult.data);
      }

      return authResult;
    } catch (error) {
      return error;
    }
  }
}
