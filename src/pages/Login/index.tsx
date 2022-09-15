import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HttpRequest } from "@/utils/service";

const LoginPage: React.FC = () => {
  const [test, setTest] = useState<string>();

  const doLogin = () => {
    HttpRequest.get<string>("/api/login1", { test: 666 })
      .then((res) => {
        setTest(res.data);
      })
      .catch(() => {
        // console.log("进入err环节", err);
      });
  };

  return (
    <div>
      LoginPage
      <br />
      <Button type={"primary"}>
        <Link to="/home">go to Home</Link>
      </Button>
      <Button onClick={doLogin}>Login</Button>
      <div> API 请求结果是： {test}</div>
    </div>
  );
};

export default LoginPage;
