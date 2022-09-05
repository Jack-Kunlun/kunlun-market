import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div>
      LoginPage
      <br />
      <Button type={"primary"}>
        <Link to="/home">go to Home</Link>
      </Button>
    </div>
  );
};

export default LoginPage;
