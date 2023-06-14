import { Public } from "@decorator/public.decorator";
import { Controller, Get } from "@nestjs/common";
import { CaptchaService } from "./services/captcha.service";
import { formatResponse } from "./utils";

@Controller()
export class AppController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get("captcha")
  @Public()
  getCaptcha() {
    try {
      const captcha = this.captchaService.captcha();

      return formatResponse({ data: captcha });
    } catch (error) {
      throw error;
    }
  }
}
