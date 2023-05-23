import { FC } from "react";

export interface IRoute {
  /**
   * 名称
   */
  title?: string;
  /**
   * 地址
   */
  path: string;
  /**
   * 组件
   */
  element?: FC;
  /**
   * 重定向地址
   */
  redirect?: string;
  /**
   * 是否校验权限, false或不存在时不校验, true为校验, 子路由会继承父路由的 auth 属性
   */
  auth?: boolean;
  /**
   * 子路由
   */
  children?: IRoute[];
  /**
   * 图标
   */
  icon?: FC;
  /**
   * 路由的key，唯一值，请勿重复
   */
  key?: string;
  /**
   * 不需要懒加载
   */
  unnecessaryLazy?: boolean;
}
