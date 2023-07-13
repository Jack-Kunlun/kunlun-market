import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { formatRoute } from "./formatRoute";
import { routes } from "./routes";

const router = createBrowserRouter(formatRoute(routes));

export const RouterContainer: FC = () => {
  return <RouterProvider router={router} />;
};
