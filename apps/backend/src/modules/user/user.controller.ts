/**
 * user controller.
 */
import { Public } from "@decorator/public.decorator";
import { Roles } from "@decorator/roles.decorator";
import { Body, Controller, Get, Post, Query, Session } from "@nestjs/common";
import { CaptchaService } from "src/services/captcha.service";
import { AuthService } from "../auth/auth.service";
import { UserLoginDto, UserPageParameterDto, UserRegisterDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly captchaService: CaptchaService,
    private userService: UserService
  ) {}

  @Post("login")
  @Public()
  async login(@Body() body: UserLoginDto, @Session() session: RequestSession) {
    try {
      const captchaResult = this.captchaService.verifyCaptcha(session.captchaId, body.code);

      if (captchaResult) {
        return captchaResult;
      }

      const authResult = await this.authService.validateUser(body.username, body.password);

      if (authResult.code === 200) {
        return await this.authService.certificate(authResult.data, "frontend");
      }

      return authResult;
    } catch (error) {
      throw error;
    }
  }

  @Post("register")
  @Public()
  async register(@Body() body: UserRegisterDto, @Session() session: RequestSession) {
    try {
      const captchaResult = this.captchaService.verifyCaptcha(session.captchaId, body.code);

      if (captchaResult) {
        return captchaResult;
      }

      return await this.userService.register(body);
    } catch (error) {
      throw error;
    }
  }

  @Get("getUserPage")
  @Roles("admin")
  async getUserPage(@Query() query: UserPageParameterDto) {
    try {
      return await this.userService.getUserPage(query);
    } catch (error) {
      throw error;
    }
  }
}
