/**
 * user controller.
 */
import { Public } from "@decorator/public.decorator";
import { Body, Controller, Post, Session } from "@nestjs/common";
import { CaptchaService } from "src/services/captcha.service";
import { AuthService } from "../auth/auth.service";
import { UserLoginDto } from "./user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly authService: AuthService, private readonly captchaService: CaptchaService) {}

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
        return await this.authService.certificate(authResult.data);
      }

      return authResult;
    } catch (error) {
      throw error;
    }
  }
}
