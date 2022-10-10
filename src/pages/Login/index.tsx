import { Form, Input, Button } from "antd";
import React from "react";

const notHaveAccount = "Don't have account? ";

const LoginPage: React.FC = () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping, @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    // eslint-disable-next-line no-console
    console.log("Received values of form: ", values);
  };

  return (
    <div className="*full bg-gradientPink *flex-center">
      <div className="w-card h-card bg-white rounded-md px-xl">
        <div className="text-38 h-200 font-semibold text-center *flex-center">Login</div>

        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
            <Input className="!border-0 !border-b !border-b-grey" size="large" placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input className="!border-0 !border-b !border-b-grey" size="large" type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            {/* class="!bg-gradientViolet" */}
            <Button className="w-full !bg-gradientViolet !text-white" size="large">
              Login
            </Button>
            <div className="mt-smm flex justify-between">
              <div>
                {notHaveAccount}
                <a href="#">Sign up</a>
              </div>
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
