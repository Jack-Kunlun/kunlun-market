import { FC, ReactNode, Suspense, lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { IRoute } from "./types";
import { NPorgress } from "@/components/NPorgress";

const renderRouter = (routes: IRoute[]): ReactNode => {
  return routes.map((item, key) => {
    const { redirect, children = [], path, element } = item;

    const AsyncLoadComponent = element ? lazy(async () => ({ default: element })) : () => null;

    return (
      <Route
        path={path}
        key={key}
        element={redirect !== undefined ? <Navigate to={redirect} /> : <AsyncLoadComponent />}
      >
        {renderRouter(children)}
      </Route>
    );
  });
};

export const RouterContainer: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<NPorgress />}>
        <Routes>{renderRouter(routes)}</Routes>
      </Suspense>
    </BrowserRouter>
  );
};
