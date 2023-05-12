import { Form, Input, Button } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LoginUserInfo, doLogin } from "@/apis/user";

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginUserInfo) => {
    setLoading(true);

    try {
      const _ = await doLogin(values);

      navigate("/home");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="*full bg-gradientPink *flex-center">
      <div className="bg-white rounded-md px-xl w-card h-card">
        <div className="text-38 h-200 font-semibold text-center *flex-center">{t("login")}</div>

        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: `${t("please input your Username")}` }]}>
            <Input className="!border-0 !border-b !border-b-grey" size="large" placeholder={`${t("username")}`} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: `${t("please input your Password")}` }]}>
            <Input
              className="!border-0 !border-b !border-b-grey"
              size="large"
              type="password"
              placeholder={`${t("password")}`}
            />
          </Form.Item>

          <Form.Item>
            <Button className="w-full !bg-gradientViolet !text-white" size="large" htmlType="submit" loading={loading}>
              {t("config")}
            </Button>
            <div className="mt-smm flex justify-between">
              <div>
                {t("Don't have account")}
                <a href="#">{t("signUp")}</a>
              </div>
              <a className="login-form-forgot" href="">
                {t("forgotPassword")}
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
