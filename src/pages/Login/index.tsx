import { Button, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "@/apis/login";
import ASpin from "@/components/Spin";
import { HttpRequest } from "@/utils/service";

const LoginPage: React.FC = () => {
  const [test, setTest] = useState<string>();

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { loading, data, error } = getLogin();

  if (loading) {
    return <ASpin />;
  }

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
    <div className="*full bg-while">
      LoginPage
      <br />
      <Button type={"primary"} onClick={goHome}>
        go to Home
      </Button>
      <Button onClick={doLogin}>Login</Button>
      <div> API 请求结果是： {test}</div>
      <div> 缓存的数据：{data} </div>
    </div>
  );
};

export default LoginPage;
