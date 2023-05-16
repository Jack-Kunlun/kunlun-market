import { FC, ReactNode, Suspense, lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { NPorgress } from "ui";
import { routes } from "./routes";
import { IRoute } from "./types";

const renderRouter = (routes: IRoute[]): ReactNode => {
  return routes.map((item, key) => {
    const { redirect, children = [], path, element, unnecessaryLazy } = item;

    const AsyncLoadComponent = () => {
      if (redirect) {
        return <Navigate to={redirect} />;
      }

      if (!element) {
        return null;
      }

      const Component = element;

      if (unnecessaryLazy) {
        return <Component />;
      }

      const LazyComponent = lazy(async () => ({ default: element }));

      /**
       * TODO: 不加Suspense标签会无限循环, 不知道为啥，空标签也不行
       * 但是下面👇这种写法不会，靓仔疑惑
       * const AsyncLoadComponent = element ? lazy(async () => ({ default: element })) : () => null;
       *
       * 上面写法存在一个问题，切换页面会出现闪屏现象
       * 解决思路：公共页面不采用懒加载的方式 并在App.tsx去除Suspense的包裹，所以改成了现在这种写法
       */
      return (
        <Suspense>
          <LazyComponent />
        </Suspense>
      );
    };

    return (
      <Route path={path} key={key} element={<AsyncLoadComponent />}>
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
