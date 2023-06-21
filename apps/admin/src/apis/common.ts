import { HttpRequest } from "public-utils";

export const getCaptcha = async () => await HttpRequest.get<string>("/api/captcha");
