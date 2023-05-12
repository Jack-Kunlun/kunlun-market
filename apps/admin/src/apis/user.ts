import { HttpRequest } from "public-utils";

export interface LoginUserInfo {
  username: string;
  password: string;
}

export const doLogin = (params: LoginUserInfo) => {
  return new Promise((resolve, reject) => {
    HttpRequest.post("/api/user/login", params)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};
