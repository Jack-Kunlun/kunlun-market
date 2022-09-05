import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterContainer } from "@/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterContainer />
  </React.StrictMode>
);
