import React, { ReactNode, Suspense } from "react";
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import { routes, IRoute } from "./routes";
import NPorgress from "@/components/NPorgress";

const renderRouter = (routes: IRoute[]): ReactNode => {
  return routes.map((item, key) => {
    const { redirect, children = [], path, element } = item;

    const Component: React.FC = element ? React.lazy(element) : () => null;

    return (
      <Route path={path} key={key} element={redirect !== undefined ? <Navigate to={redirect} /> : <Component />}>
        {renderRouter(children)}
      </Route>
    );
  });
};

export const RouterContainer: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<NPorgress />}>
        <Routes>{renderRouter(routes)}</Routes>
      </Suspense>
    </Router>
  );
};
