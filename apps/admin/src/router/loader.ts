import { message } from "antd";
import { redirect } from "react-router-dom";

export const loader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    message.error("您还未登录，请先登录！");

    return redirect("/login");
  }

  return null;
};
