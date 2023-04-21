import { Spin } from "antd";
import React from "react";

interface Props {
  size?: "small" | "large" | "default";
}

export const ASpin: React.FC<Props> = ({ size = "large" }) => (
  <div className="*full *flex-center">
    <Spin size={size} />
  </div>
);
