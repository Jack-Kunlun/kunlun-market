import { Spin } from "antd";
import React from "react";

const styles = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ASpin: React.FC = () => (
  <div style={styles}>
    <Spin size="large" />
  </div>
);

export default ASpin;
