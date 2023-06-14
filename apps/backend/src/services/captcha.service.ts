import { Injectable } from "@nestjs/common";
import * as svgCaptcha from "svg-captcha";

@Injectable()
export class CaptchaService {
  // 验证码
  captcha() {
    const captcha = svgCaptcha.createMathExpr({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: "#cc9966",
    });

    return captcha;
  }
}
