import { FC } from "react";

export interface IRoute {
  // 路由信息
  title?: string;
  // 路由地址
  path?: string;
  // 路由组件
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: FC;
  // 重定向地址
  redirect?: string;
  // 是否校验权限, false或不存在时不校验, true为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
  children?: IRoute[];
}
