import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestCodes, Response, EndpointType } from "./types";

//默认路径，这里也可以使用env来判断环境
// "https://localhost:3000/"
const baseURL = "";

const config = {
  timeout: 60000, // 请求超时时间
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

class Http {
  // 定义成员变量并指定类型
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * 请求拦截器
     * token校验：存在时添加到请求头中
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token") || "";

        return {
          ...config,
          headers: {
            "x-access-token": token,
          },
        };
      },
      (error: AxiosError) => {
        Promise.reject(error);
      }
    );

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理]
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse<Response>) => {
        const { data } = response;

        // 登录信息失效，应跳转到登录页面，并清空本地的token
        if (data.code === RequestCodes.OVERDUE) {
          localStorage.setItem("token", "");
          // router.replace({ // path: '/login' // })

          return Promise.reject(data);
        }

        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== RequestCodes.SUCCESS) {
          // 此处也可以使用组件提示报错信息
          // eslint-disable-next-line no-console
          console.error(data);

          return Promise.reject(data);
        }

        return data;
      },
      (error: AxiosError) => {
        const { response } = error;

        if (response) {
          this.handleCode(response.status);
        }

        // 可以跳转到错误页面，也可以不做操作
        if (!window.navigator.onLine) {
          // return router.replace({ // path: '/404' // });
          // eslint-disable-next-line no-console
          console.error("网络连接失败");
        }
      }
    );
  }

  /**
   * 请求拦截器
   * 错误处理方法
   */
  handleCode(code: number): void {
    switch (code) {
      case 401:
        // eslint-disable-next-line no-console
        console.error("登录失败，请重新登录");
        break;
      case 404:
        // eslint-disable-next-line no-console
        console.error("当前接口请求失败，请假查是否存在！");
        break;
      default:
        // eslint-disable-next-line no-console
        console.error("请求失败");
        break;
    }
  }

  /**
   * 常用方法封装
   * T：返回类型定义
   * P：参数类型定义
   * url：请求地址
   * params：请求参数
   * config：请求配置（一般不用，特殊情况需要添加配置时使用）
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T, P = any>(url: EndpointType, params?: P, config?: AxiosRequestConfig): Promise<Response<T>> {
    return this.service.get(url, { params, ...config });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T, P = any>(url: EndpointType, params?: P, config?: AxiosRequestConfig): Promise<Response<T>> {
    return this.service.post(url, params, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T, P = any>(url: EndpointType, params?: P, config?: AxiosRequestConfig): Promise<Response<T>> {
    return this.service.put(url, params, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T, P = any>(url: EndpointType, params?: P, config?: AxiosRequestConfig): Promise<Response<T>> {
    return this.service.delete(url, { params, ...config });
  }
}

export const HttpRequest = new Http(config);
