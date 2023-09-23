import { formatMenu, getRouteConfigMap } from "./formatMenu";
import { menuRoutes } from "./routes";

const menus = formatMenu(menuRoutes).map((menu: any) => {
  if (menu.children && menu.children.length === 1 && menu.children[0].index) {
    const { children, ...rest } = menu;

    return rest;
  }

  return menu;
});

const { routePathMap, routeKeyMap } = getRouteConfigMap(menuRoutes);

export { menus, routePathMap, routeKeyMap };
