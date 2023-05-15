import { HttpRequest } from "public-utils";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  password: string;
  token: string;
}

export const doLogin = async (params: LoginParams) => {
  try {
    const res = await HttpRequest.post<LoginResponse>("/api/user/login", params);

    return res;
  } catch (error) {
    // return error;
  }
};
