import { UsergroupDeleteOutlined } from "@ant-design/icons";
import { IRoute } from "./types";
import { BasicLayout } from "@/layout/BasicLayout";
import { BlankLayout } from "@/layout/BlankLayout";
import { NoMatch } from "@/pages/404";
import { Help } from "@/pages/Help";
import { HomePage } from "@/pages/Home";
import { UserPage } from "@/pages/Home/User";
import { LoginPage } from "@/pages/Login";
import { UserSetting } from "@/pages/Settings/UserSetting";

export const menuRoute = [
  {
    path: "/home/user",
    title: "用户管理",
    key: "User",
    icon: UsergroupDeleteOutlined,
    unnecessaryLazy: true,
    element: BlankLayout,
    children: [
      {
        path: "/home/user",
        key: "UserIndex",
        title: "用户管理",
        element: HomePage,
      },
      {
        path: "/home/user/user",
        title: "角色管理",
        key: "UserAdmin",
        element: UserPage,
      },
    ],
  },
  {
    path: "/home/help",
    title: "帮助",
    key: "Help",
    element: Help,
    icon: UsergroupDeleteOutlined,
  },
  {
    path: "/home/settings",
    title: "设置",
    key: "Settings",
    icon: UsergroupDeleteOutlined,
    element: BlankLayout,
    children: [
      {
        path: "/home/settings/userSetting",
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
    path: "/home",
    title: "Home",
    element: BasicLayout,
    key: "Home",
    unnecessaryLazy: true,
    children: [...menuRoute],
  },
  {
    path: "*",
    element: NoMatch,
  },
];
