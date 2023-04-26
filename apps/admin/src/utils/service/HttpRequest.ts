import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestCodes, Response, EndpointType, ResponseError } from "./types";
import { handleCode } from "./utils";

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

        // 登录过期，清空本地的token
        if (data.code === RequestCodes.EXPIRED) {
          localStorage.setItem("token", "");

          return Promise.reject(data);
        }

        // 接口正常时直接返回数据，其他状态都被视为错误
        if (data.code && data.code === RequestCodes.SUCCESS) {
          return data;
        }

        return Promise.reject(data);
      },
      (error: AxiosError<ResponseError>) => {
        const { response } = error;

        if (response && response?.status !== RequestCodes.SUCCESS) {
          handleCode(response.status, response.data.message);
        }

        if (!window.navigator.onLine) {
          // eslint-disable-next-line no-console
          console.error("网络连接失败");
        }

        return Promise.reject(response?.data);
      }
    );
  }

  /**
   * @description 常用方法封装
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
