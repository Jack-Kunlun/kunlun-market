import axios from "axios";

//默认路径，这里也可以使用env来判断环境
const baseURL = "https://localhost:3000/";

const service = axios.create({
  timeout: 60000, // 请求超时时间
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 请求拦截（补充请求相关的配置）
service.interceptors.request.use(
  (config) => {
    // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
    return config;
  },
  (err) => {
    // 请求发生错误时的相关处理 抛出错误
    Promise.reject(err);
  }
);

// 响应拦截（处理返回的数据或者错误）
service.interceptors.response.use(
  (res) => {
    // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    // res 是所有相应的信息
    return Promise.resolve(res);
  },
  (err) => {
    // 服务器响应发生错误时的处理
    Promise.reject(err);
  }
);

export default service;
