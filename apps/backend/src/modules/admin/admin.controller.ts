import { Public } from "@decorator/public.decorator";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { PagingParameterDto } from "src/dto/pagingParameter.dto";
import { AuthService } from "../auth/auth.service";
import { AdminUserLoginDto, RegisterAdminUserInfoDto } from "./admin.dto";
import { AdminUserService } from "./admin.service";

@Controller("admin")
export class AdminUserController {
  constructor(private readonly userService: AdminUserService, private readonly authService: AuthService) {}

  @Get("user")
  findUser() {
    return this.userService.find();
  }

  @Get("user/:id")
  findOne(@Param("id") id: string) {
    return this.userService.findOneById(+id);
  }

  @Post("register")
  @Public()
  async register(@Body() body: RegisterAdminUserInfoDto) {
    try {
      throw "error";

      return await this.userService.insertOne(body);
    } catch (error) {
      return error;
    }
  }

  @Post("login")
  @Public()
  async login(@Body() body: AdminUserLoginDto) {
    try {
      const authResult = await this.authService.validateUser(body.username, body.password);

      if (authResult.code === 200) {
        return await this.authService.certificate(authResult.data);
      }

      return authResult;
    } catch (error) {
      return error;
    }
  }

  @Get("getUser")
  @Public()
  async getUserPage(@Query() query: PagingParameterDto) {
    try {
      const users = await this.userService.getUserPage(query);

      return users;
    } catch (error) {
      return error;
    }
  }
}
