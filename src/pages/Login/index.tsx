import { Form, Input, Button } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const notHaveAccount = "Don't have account? ";

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line unicorn/consistent-function-scoping, @typescript-eslint/no-explicit-any
  const onFinish = (values: Nullable<string>) => {
    // eslint-disable-next-line no-console
    console.log("Received values of form: ", values);
  };

  return (
    <div className="*full bg-gradientPink *flex-center">
      <div className="bg-white rounded-md px-xl w-card h-card">
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
            <Button
              className="w-full !bg-gradientViolet !text-white"
              size="large"
              onClick={() => {
                navigate("/home");
              }}
            >
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
