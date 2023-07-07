import { Buffer } from "buffer";
import { Form, Input, Button, message } from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminUserDoLogin, AdminUserLoginParams } from "@/apis/admin";
import { getCaptcha } from "@/apis/common";
import LogoSvg from "@/assets/svg/logo.svg";

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [captcha, setCaptcha] = useState("");

  const onFinish = async (values: AdminUserLoginParams) => {
    try {
      setLoading(true);
      const res = await adminUserDoLogin(values);

      if (res.code === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/home");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCaptcha = async () => {
    try {
      const res = await getCaptcha();

      setCaptcha(res.data);
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    if (!captcha) {
      fetchCaptcha();
    }
  }, []);

  return (
    <div className="full flex-center bg-gradientPink">
      <div className="bg-white rounded-md px-12 w-card h-card">
        <div className="text-38px h-150 font-semibold text-center flex-center">{t("login")}</div>

        <img w="100px" src={LogoSvg} alt="" />

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
            <div className="w-full flex">
              <Form.Item noStyle name="code" rules={[{ required: true, message: `${t("please input your captcha")}` }]}>
                <Input className="rounded-br-none rounded-tr-none" placeholder={`${t("captcha")}`} size="large" />
              </Form.Item>
              <img
                src={captcha ? `data:image/svg+xml;base64,${Buffer.from(captcha).toString("base64")}` : ""}
                alt={`${t("loading")}`}
                onClick={fetchCaptcha}
                className="rounded-br-sm rounded-tr-sm"
              />
            </div>
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
