import { HttpRequest } from "public-utils";

export interface GetCaptchaResponse {
  text: string;
  data: string;
}

export const getCaptcha = async () => {
  try {
    const res = await HttpRequest.get<GetCaptchaResponse>("/api/captcha");

    return res;
  } catch (error) {
    /* empty */
  }
};
