export interface IRoute {
  // 路由信息
  title?: string;
  // 是否是根路由，当index为true是，path和children是无效的
  index?: boolean;
  // 路由地址
  path?: string;
  // 路由组件
  element?: any;
  // 重定向地址
  redirect?: string;
  // 是否校验权限, false或不存在时不校验, true为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
  children?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    title: "Login",
    element: () => import("@/pages/Login"),
  },
  {
    path: "/home",
    title: "Home",
    element: () => import("@/layout/BasicLayout"),
    children: [
      {
        index: true,
        element: () => import("@/pages/Home"),
      },
    ],
  },
  {
    path: "*",
    element: () => import("@/pages/404"),
  },
];
