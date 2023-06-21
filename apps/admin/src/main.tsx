import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";
import "@unocss/reset/normalize.css";
import { RouterContainer } from "@/routes";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  /**
   * StrictMode标签表示将启用严格模式
   * 严格模式在开发中启用以下检查：
   * 1. 您的组件将重新渲染额外的时间来查找由不纯渲染引起的错误。
   * 2. 您的组件将额外重新运行 Effects以查找因缺少 Effect 清理而导致的错误。
   * 3. 将检查您的组件是否使用了已弃用的 API。
   * 所有这些检查仅用于开发，不会影响生产构建。
   */
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterContainer />
    </ConfigProvider>
  </StrictMode>
);
