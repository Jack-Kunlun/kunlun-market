import { Spin } from "antd";
import React from "react";

interface Props {
  size?: "small" | "large" | "default";
}

const ASpin: React.FC<Props> = ({ size = "large" }) => (
  <div className="w-full h-full flex justify-center items-center">
    <Spin size={size} />
  </div>
);

export default ASpin;
