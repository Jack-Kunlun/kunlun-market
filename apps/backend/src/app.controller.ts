import { Public } from "@decorator/public.decorator";
import { Controller, Get, Session } from "@nestjs/common";
import { CaptchaService } from "./services/captcha.service";

@Controller()
export class AppController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get("captcha")
  @Public()
  getCaptcha(@Session() session: RequestSession) {
    const captchaResult = this.captchaService.createCaptcha();

    session.captchaId = captchaResult.captchaId;

    return captchaResult.result;
  }
}
