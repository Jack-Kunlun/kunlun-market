import React from "react";
import { Outlet } from "react-router-dom";

export const BasicLayout: React.FC = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        background: "blue",
      }}
    >
      <Outlet />
    </div>
  );
};
