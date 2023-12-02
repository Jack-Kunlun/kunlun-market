import type { MenuProps } from "antd";
import React from "react";
import { RouteConfig } from "@/router";

/**
 * 格式化菜单
 * @param routes 路由配置
 * @param level 层级
 * @param parent 父级路由信息
 *
 * @returns 菜单配置
 */
export const formatMenu = (routes: RouteConfig[], level = 0) => {
  const menus: MenuProps["items"] = [];

  routes.forEach((route, index) => {
    // 生成唯一key
    const key = `${level}-${index}-${route.name}`;

    if (route.children && route.children.length > 0) {
      menus.push({
        // ...route,
        key,
        icon: route.icon ? React.createElement(route.icon) : route.icon,
        label: route.name,
        children: formatMenu(route.children, level + 1),
      });
    } else {
      // 只拼接菜单页面
      if (!route.hideMenu) {
        menus.push({
          // ...route,
          key,
          icon: route.icon ? React.createElement(route.icon) : route.icon,
          label: route.name,
        });
      }
    }
  });

  return menus;
};

/**
 * 保存路由信息,用于跳转和面包屑
 * 子路由可能会设置index为true,所以需要判断,如果设置了index,则使用父级的path
 * @param routes 路由配置
 * @param level 层级
 * @param parent 父级路由信息
 *
 * @returns 路由信息
 */
export const getRouteConfigMap = (routes: RouteConfig[], level = 0, parent?: RouteConfig) => {
  const routeKeyMap = new Map<string, { path: string; title: string }>();
  const routePathMap = new Map<string, string[]>();

  routes.forEach((route, index) => {
    // 生成唯一key
    const key = `${level}-${index}-${route.name}`;

    routeKeyMap.set(key, { path: (route.path || parent?.path) as string, title: route.name });

    if (level === 0) {
      routePathMap.set(route.path as string, [key]);
    } else {
      const parentKeys = routePathMap.get(parent?.path || "") || [];

      if (route.index) {
        const newKeys = [key, ...parentKeys];

        routePathMap.set(parent?.path || "", newKeys);
      } else {
        routePathMap.set(route.path || "", [key, ...parentKeys]);
      }
    }

    if (route.children && route.children.length > 0) {
      const { routeKeyMap: childRouteKeyMap, routePathMap: childRoutePathMap } = getRouteConfigMap(
        route.children,
        level + 1,
        route
      );

      childRouteKeyMap.forEach((value, key) => {
        routeKeyMap.set(key, value);
      });

      childRoutePathMap.forEach((value, key) => {
        const parentKeys = routePathMap.get(route.path || "") || [];

        routePathMap.set(key, [...value, ...parentKeys]);
      });
    }
  });

  return { routeKeyMap, routePathMap };
};
