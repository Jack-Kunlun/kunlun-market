import { HttpRequest } from "public-utils";

export interface RoleInfo {
  id: number;
  roleName: string;
  authList: any[];
  status: number;
  createBy: number;
  createTime: string;
  updateTime: string;
}

export interface RolePageParams extends PagingParameter {
  roleName?: string;
}

export interface RolePageResponse {
  data: RoleInfo[];
  total: number;
}

export const getUserPage = async (params: RolePageParams) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await HttpRequest.get<RolePageResponse>("/api/user/getRolePage", params);

    return res;
  } catch (error) {
    throw error;
  }
};
