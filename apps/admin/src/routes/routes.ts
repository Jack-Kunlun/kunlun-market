import { UsergroupDeleteOutlined } from "@ant-design/icons";
import { IRoute } from "./types";
import { BasicLayout } from "@/layout/BasicLayout";
import { BlankLayout } from "@/layout/BlankLayout";
import { NoMatch } from "@/pages/404";
import { Help } from "@/pages/Help";
import { HomePage } from "@/pages/Home";
import { LoginPage } from "@/pages/Login";
import { UserSetting } from "@/pages/Settings/UserSetting";
import { UserPage } from "@/pages/User";

export const menuRoute: IRoute[] = [
  {
    path: "/admin/home",
    title: "首页",
    key: "Home",
    icon: UsergroupDeleteOutlined,
    unnecessaryLazy: true,
    element: BlankLayout,
    children: [
      {
        path: "/admin/home",
        key: "HomeIndex",
        title: "首页",
        element: HomePage,
      },
    ],
  },
  {
    path: "/admin/user",
    title: "用户管理",
    key: "User",
    icon: UsergroupDeleteOutlined,
    unnecessaryLazy: true,
    element: BlankLayout,
    children: [
      {
        path: "/admin/user",
        key: "UserIndex",
        title: "用户管理",
        element: HomePage,
      },
      {
        path: "/admin/user/role",
        title: "角色管理",
        key: "UserAdmin",
        element: UserPage,
      },
    ],
  },
  {
    path: "/admin/help",
    title: "帮助",
    key: "Help",
    element: Help,
    icon: UsergroupDeleteOutlined,
  },
  {
    path: "/admin/settings",
    title: "设置",
    key: "Settings",
    icon: UsergroupDeleteOutlined,
    element: BlankLayout,
    unnecessaryLazy: true,
    children: [
      {
        path: "/admin/settings/userSetting",
        title: "用户设置",
        key: "UserSetting",
        element: UserSetting,
      },
    ],
  },
];

export const routes: IRoute[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    title: "Login",
    element: LoginPage,
  },
  {
    path: "/admin",
    title: "Admin",
    element: BasicLayout,
    key: "Admin",
    unnecessaryLazy: true,
    children: [...menuRoute],
  },
  {
    path: "*",
    element: NoMatch,
  },
];

const formatRoutePaths = (routers: IRoute[]) => {
  const paths: string[] = [];

  routers.forEach((router) => {
    if (router.path) {
      paths.push(router.path);
    }

    if (router.children) {
      paths.push(...formatRoutePaths(router.children));
    }
  });

  return paths;
};

export const routePaths = formatRoutePaths(routes);
