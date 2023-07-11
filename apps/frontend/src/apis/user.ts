import { HttpRequest } from "public-utils";

export interface UserLoginParams {
  username: string;
  password: string;
  code: string;
}

export interface UserLoginResponse {
  createBy: number;
  createTime: string;
  email: string;
  id: number;
  password: string;
  passwordSalt: string;
  phone: string;
  realName: string;
  roleId: number;
  status: number;
  token: string;
  updateTime: string;
  username: string;
}

export const userDoLogin = async (params: UserLoginParams) => {
  try {
    return await HttpRequest.post<UserLoginResponse>("/api/user/login", params);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    throw error;
  }
};

export interface UserRegisterParams {
  username: string;
  password: string;
  code: string;
  email: string;
  phone: string;
  realName: string;
}

export const userDoRegister = async (params: UserRegisterParams) => {
  try {
    return await HttpRequest.post("/api/user/register", params);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    throw error;
  }
};
