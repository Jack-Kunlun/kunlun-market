import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import React from "react";
import ReactDOM from "react-dom/client";
import "virtual:windi.css";
import "./index.css";
import { RouterContainer } from "@/routes";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterContainer />
    </ConfigProvider>
  </React.StrictMode>
);
