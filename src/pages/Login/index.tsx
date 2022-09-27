import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button as AButton } from "antd";
import React from "react";
import Button from "@/components/Button";

const LoginPage: React.FC = () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping, @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    // eslint-disable-next-line no-console
    console.log("Received values of form: ", values);
  };

  return (
    <div className="*full bg-gradientPink *flex-center">
      <div className="w-card h-card bg-white rounded-md px-xl">
        <div className="text-38 font-semibold text-center">Login</div>

        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            {/* class="!bg-gradientViolet" */}
            <Button class="w-full" type="default">
              default button
            </Button>

            <AButton size="large" type="ghost" shape="round">
              button
            </AButton>
            <AButton size="large" type="ghost" shape="circle">
              button
            </AButton>
            <div>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't have account?
              <a href="#">Sign up</a>
            </div>
            <div>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
