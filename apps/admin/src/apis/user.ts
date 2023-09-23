import { HttpRequest } from "public-utils";

export interface UserInfo {
  createBy: number;
  createTime: string;
  email: string;
  id: number;
  phone: string;
  realName: string;
  roleId: number;
  status: string;
  updateTime: string;
  username: string;
}

export interface UserPageParams extends PagingParameter {
  username?: string;
  realName?: string;
}

export interface UserPageResponse {
  data: UserInfo[];
  total: number;
}

export const getUserPage = async (params: UserPageParams) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await HttpRequest.get<UserPageResponse>("/api/user/getUserPage", params);

    return res;
  } catch (error) {
    throw error;
  }
};
