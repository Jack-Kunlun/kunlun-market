import { Buffer } from "buffer";
import { Form, Input, Button, Space } from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GetCaptchaResponse, getCaptcha } from "@/apis/common";
import { LoginParams, doLogin } from "@/apis/user";

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [captchaInfo, setCaptchaInfo] = useState<GetCaptchaResponse>();

  const onFinish = async (values: LoginParams) => {
    setLoading(true);

    try {
      const res = await doLogin(values);

      if (res && res.code === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/home");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCaptcha = async () => {
    try {
      const res = await getCaptcha();

      setCaptchaInfo(res?.data);
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  return (
    <div className="full flex-center bg-gradientPink">
      <div className="bg-white rounded-md px-12 w-card h-card">
        <div className="text-38px h-150 font-semibold text-center flex-center">{t("login")}</div>

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
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Form.Item
                noStyle
                name="captcha"
                rules={[{ required: true, message: `${t("please input your captcha")}` }]}
              >
                <Input placeholder={`${t("captcha")}`} size="large" />
              </Form.Item>
              <img
                src={
                  captchaInfo ? `data:image/svg+xml;base64,${Buffer.from(captchaInfo?.data).toString("base64")}` : ""
                }
                alt={`${t("loading")}`}
                onClick={fetchCaptcha}
                className="rounded-smm"
              />
            </Space>
          </Form.Item>

          <Form.Item>
            <Button className="w-full !bg-gradientViolet !text-white" size="large" htmlType="submit" loading={loading}>
              {t("config")}
            </Button>
            <div className="mt-sm flex justify-between">
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
