import { formatMenu, getRouteConfigMap } from "./formatMenu";
import { menuRoutes } from "./routes";
import { MenuItem } from "./types";

const menus = formatMenu(menuRoutes).map((menu) => {
  const { children, ...rest } = menu;

  if (children && children.length === 1 && children[0].index) {
    return { key: rest.key, icon: rest.icon, label: rest.label };
  }

  return { key: rest.key, icon: rest.icon, label: rest.label, children };
}) as MenuItem;

const { routePathMap, routeKeyMap } = getRouteConfigMap(menuRoutes);

export { menus, routePathMap, routeKeyMap };
