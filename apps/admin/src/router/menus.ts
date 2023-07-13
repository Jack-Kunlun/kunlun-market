import { formatMenu, getRouteConfigMap } from "./formatMenu";
import { menuRoutes } from "./routes";

const menus = formatMenu(menuRoutes);

const { routePathMap, routeKeyMap } = getRouteConfigMap(menuRoutes);

export { menus, routePathMap, routeKeyMap };
