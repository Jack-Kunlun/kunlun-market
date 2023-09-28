import type { MenuProps } from "antd";
import { FC } from "react";
import type { RouteObject } from "react-router-dom";

export type RouteConfig = Override<
  RouteObject,
  {
    name: string;
    children?: RouteConfig[];
    icon?: FC;
    hideMenu?: boolean;
  }
>;

export type MenuItem = Required<MenuProps>["items"][number];
