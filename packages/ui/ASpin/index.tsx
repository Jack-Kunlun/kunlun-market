import { Spin } from "antd";
import React from "react";

type Size = "small" | "large" | "default";

interface Props {
  size: Size;
}

export const ASpin: React.FC<Props> = ({ size = "large" }) => (
  <div className="full flex-center">
    <Spin size={size} />
  </div>
);
