import { FC, ReactNode, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { NPorgress } from "ui";
import { RouteConfig } from "./types";

/**
 * 封装一层 专门负责显示页面标题
 */
const SetDocumentTitle: FC<{ title?: string; children: ReactNode }> = ({ title = "admin", children }) => {
  window.document.title = title;

  return <Suspense fallback={<NPorgress />}>{children}</Suspense>;
};

export const formatRoute = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map(({ name, icon, children, ...route }) => {
    const routeObject = {
      ...route,
      element: <SetDocumentTitle title={name}>{route.element}</SetDocumentTitle>,
    } as RouteObject;

    if (children?.length) {
      routeObject.children = formatRoute(children);
    }

    return routeObject;
  });
};
