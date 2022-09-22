import { Button, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "@/apis/login";
import { HttpRequest } from "@/utils/service";

const LoginPage: React.FC = () => {
  const [test, setTest] = useState<string>();

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { data, loading, error } = getLogin();

  const doLogin = () => {
    HttpRequest.get<string>("/api/login", { test: 666 })
      .then((res) => {
        setTest(res.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const goHome = () => {
    navigate("/home", { replace: true });
  };

  return (
    <div>
      LoginPage
      <br />
      <Button type={"primary"} onClick={goHome} className="bg-red-500 hover:bg-blue-700">
        go to Home
      </Button>
      <Button onClick={doLogin}>Login</Button>
      <div> API 请求结果是： {test}</div>
    </div>
  );
};

export default LoginPage;
