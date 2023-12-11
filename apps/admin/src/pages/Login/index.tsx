import { Buffer } from "buffer";
import { Form, Input, Button, message } from "antd";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminUserDoLogin, AdminUserLoginParams } from "@/apis/admin";
import { getCaptcha } from "@/apis/common";
import LogoSvg from "@/assets/svg/logo.svg";

const LoginPage: FC = () => {
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
        navigate("/home");
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
    <div className="full relative">
      <div className="h-half w-full bg-gradientViolet"></div>
      <div className="h-half w-full"></div>

      <div
        className={classNames(
          "w-card bg-white px-xxxl py-oversized absolute top-half left-half transform-center z-1 shadow-[0px_5px_15px_0px_rgba(76,_57,_47,_0.10)] rd-smm"
        )}
      >
        <img h="50px" src={LogoSvg} alt="" />

        <div className="text-black text-xxxl not-oblique font-700 mt-lg mb-sm">Welcome to Kunlun</div>

        <div className="text-md text-gray not-oblique mb-lg">Login to your account</div>

        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: `${t("please input your Username")}` }]}>
            <Input
              className="!border-0 !border-b !border-b-grey !rd-smm"
              size="large"
              placeholder={`${t("username")}`}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: `${t("please input your Password")}` }]}>
            <Input
              className="!border-0 !border-b !border-b-grey !rd-smm"
              size="large"
              type="password"
              placeholder={`${t("password")}`}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <div className="w-full flex">
              <Form.Item noStyle name="code" rules={[{ required: true, message: `${t("please input your captcha")}` }]}>
                <Input className="rd-smm rd-br-none rd-tr-none" placeholder={`${t("captcha")}`} size="large" />
              </Form.Item>
              <img
                src={captcha ? `data:image/svg+xml;base64,${Buffer.from(captcha).toString("base64")}` : ""}
                alt={`${t("loading")}`}
                onClick={fetchCaptcha}
                className="rd-br-smm rd-tr-smm"
              />
            </div>
          </Form.Item>

          <Form.Item noStyle>
            <Button className="w-full !bg-gradientPink !text-white" size="large" htmlType="submit" loading={loading}>
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

      <div className="w-full absolute z-1 bottom-xxl text-center text-gray">Kunlun</div>
    </div>
  );
};

export default LoginPage;
