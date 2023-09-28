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

export interface MenuItem {
  id: number;
  menuName: string;
  menuCode: string;
  path: string;
  description: string;
  parentId?: number;
  nodeType?: number;
  sort?: number;
  hideMenu: boolean;
  icon: string;
  status: number;
  createBy: number;
  children: MenuItem[];
  createTime: string;
  updateTime: string;
}

export const getMenuList = async () => await HttpRequest.get<MenuItem[]>("/api/menu/list");
