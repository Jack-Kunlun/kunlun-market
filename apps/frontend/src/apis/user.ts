import { HttpRequest } from "public-utils";

export interface UserLoginParams {
  username: string;
  password: string;
  code: string;
}

export interface UserLoginResponse {
  username: string;
  password: string;
  token: string;
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
