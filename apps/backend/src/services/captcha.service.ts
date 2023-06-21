import { Injectable } from "@nestjs/common";
import { formatResponse } from "@utils/index";
import * as svgCaptcha from "svg-captcha";
import { v4 as getUuidV4 } from "uuid";

interface CaptchaCache {
  text: string;
  time: number;
}

@Injectable()
export class CaptchaService {
  private captchaCache = new Map<string, CaptchaCache>();
  private expiration = 5 * 60 * 1000;

  /**
   * 生产验证码
   */
  createCaptcha() {
    const captcha = svgCaptcha.createMathExpr({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: "#cc9966",
    });

    const uniqueId = getUuidV4();

    this.captchaCache.set(uniqueId, { text: captcha.text, time: Date.now() });

    return { result: formatResponse({ data: captcha.data }), captchaId: uniqueId };
  }

  /**
   * 验证验证码
   */
  verifyCaptcha(captchaId = "", text: string) {
    if (!captchaId) {
      return formatResponse({ code: 400, message: "验证码已失效" });
    }

    const current = this.captchaCache.get(captchaId);

    if (!current) {
      return formatResponse({ code: 400, message: "验证码已失效" });
    }

    const now = Date.now();
    // 验证码是否过期
    const isExpiration = current.time + this.expiration <= now;

    if (isExpiration) {
      return formatResponse({ code: 400, message: "验证码已失效" });
    }

    if (current.text !== text) {
      return formatResponse({ code: 400, message: "验证码输入错误" });
    }
  }
}
