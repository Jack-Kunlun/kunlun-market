import { IRoute } from "./types";
import { BasicLayout } from "@/layout/BasicLayout";
import { NoMatch } from "@/pages/404";
import { HomePage } from "@/pages/Home";
import { UserPage } from "@/pages/Home/User";
import { LoginPage } from "@/pages/Login";

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
    children: [
      {
        path: "/home",
        title: "HomeIndex",
        element: HomePage,
      },
      {
        path: "/home/user",
        title: "HomeUser",
        element: UserPage,
      },
    ],
  },
  {
    path: "*",
    element: NoMatch,
  },
];
