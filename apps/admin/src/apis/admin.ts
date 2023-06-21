import { HttpRequest } from "public-utils";

export interface AdminUserLoginParams {
  username: string;
  password: string;
  code: string;
}

export interface AdminUserLoginResponse {
  username: string;
  password: string;
  token: string;
}

export const adminUserDoLogin = async (params: AdminUserLoginParams) =>
  await HttpRequest.post<AdminUserLoginResponse>("/api/admin/login", params);
