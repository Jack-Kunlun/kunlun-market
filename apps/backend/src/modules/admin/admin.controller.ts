import { Public } from "@decorator/public.decorator";
import { Body, Controller, Get, Param, Post, Query, Session } from "@nestjs/common";
import { PagingParameterDto } from "src/dto/pagingParameter.dto";
import { CaptchaService } from "src/services/captcha.service";
import { AuthService } from "../auth/auth.service";
import { AdminUserLoginDto, RegisterAdminUserInfoDto } from "./admin.dto";
import { AdminUserService } from "./admin.service";

@Controller("admin")
export class AdminUserController {
  constructor(
    private readonly userService: AdminUserService,
    private readonly authService: AuthService,
    private readonly captchaService: CaptchaService
  ) {}

  @Get("user")
  findUser() {
    try {
      return this.userService.find();
    } catch (error) {
      throw error;
    }
  }

  @Get("user/:id")
  findOne(@Param("id") id: string) {
    try {
      return this.userService.findOneById(+id);
    } catch (error) {
      throw error;
    }
  }

  @Post("register")
  @Public()
  async register(@Body() body: RegisterAdminUserInfoDto) {
    try {
      return await this.userService.insertOne(body);
    } catch (error) {
      throw error;
    }
  }

  @Post("login")
  @Public()
  async login(@Body() body: AdminUserLoginDto, @Session() session: RequestSession) {
    try {
      const captchaResult = this.captchaService.verifyCaptcha(session.captchaId, body.code);

      if (captchaResult) {
        return captchaResult;
      }

      const authResult = await this.authService.validateUser(body.username, body.password);

      if (authResult.code === 200) {
        return await this.authService.certificate(authResult.data);
      }

      return authResult;
    } catch (error) {
      throw error;
    }
  }

  @Get("getUser")
  @Public()
  async getUserPage(@Query() query: PagingParameterDto) {
    try {
      const users = await this.userService.getUserPage(query);

      return users;
    } catch (error) {
      throw error;
    }
  }
}
