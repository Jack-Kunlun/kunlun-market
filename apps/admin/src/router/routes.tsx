import { HomeOutlined, UserOutlined, SettingOutlined, ApiOutlined, ClusterOutlined } from "@ant-design/icons";
import { lazy } from "react";
import { loader as rootLoader } from "./loader";
import { RouteConfig } from "./types";
import { BasicLayout } from "@/layout/BasicLayout";
import { BlankLayout } from "@/layout/BlankLayout";
import { NoMatch } from "@/pages/404";
import Login from "@/pages/Login";

const UserSetting = lazy(() => import("@/pages/Settings/UserSetting"));
const UserPage = lazy(() => import("@/pages/User"));
const RolePage = lazy(() => import("@/pages/Role"));
const AddRolePage = lazy(() => import("@/pages/Role/Add"));
const MenuPage = lazy(() => import("@/pages/Role/Menu"));
const HomePage = lazy(() => import("@/pages/Home"));
const HelpPage = lazy(() => import("@/pages/Help"));

export const menuRoutes: RouteConfig[] = [
  {
    path: "/home",
    name: "Home",
    element: <HomePage />,
    icon: HomeOutlined,
  },
  {
    path: "/user",
    name: "User",
    icon: UserOutlined,
    element: <BlankLayout />,
    children: [
      {
        index: true,
        name: "User",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/role",
    name: "Role",
    element: <BlankLayout />,
    icon: ClusterOutlined,
    children: [
      {
        index: true,
        name: "Role",
        element: <RolePage />,
      },
      {
        path: "/role/menu",
        name: "Menu",
        element: <MenuPage />,
      },
      {
        path: "/role/add",
        name: "AddRole",
        hideMenu: true,
        element: <AddRolePage />,
      },
    ],
  },
  {
    path: "/help",
    name: "Help",
    icon: ApiOutlined,
    element: <HelpPage />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: SettingOutlined,
    element: <BlankLayout />,
    children: [
      {
        path: "/settings/user",
        name: "UserSetting",
        element: <UserSetting />,
      },
    ],
  },
];

export const routes: RouteConfig[] = [
  {
    path: "*",
    name: "404",
    element: <NoMatch />,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/",
    name: "root",
    element: <BasicLayout />,
    loader: rootLoader,
    children: menuRoutes,
  },
];

const formatRoutePaths = (routers: RouteConfig[]) => {
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
