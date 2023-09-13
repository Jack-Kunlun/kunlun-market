import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpRequestCodes, HttpResponse, EndpointType, HttpResponseError } from "./types";
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
  // 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>;

  constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);
    this.abortControllerMap = new Map();

    /**
     * 请求拦截器
     * token校验：存在时添加到请求头中
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token") || "";

        const controller = new AbortController();
        const url = config.url || "";

        config.signal = controller.signal;
        this.abortControllerMap.set(url, controller);

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
      (response: AxiosResponse<HttpResponse>) => {
        const { data, config } = response;

        const url = config.url || "";

        // 清理已完成请求的AbortController
        this.clearAbortController(url);

        // 登录过期，清空本地的token
        if (data.code === HttpRequestCodes.EXPIRED) {
          localStorage.setItem("token", "");

          throw new Error("登录过期，请重新登录");
        }

        // 接口状态码大于400，统一处理
        if (data.code >= 400) {
          throw data;
        }

        return data;
      },
      (error: AxiosError<HttpResponseError>) => {
        const { response } = error;

        if (response && response?.status !== HttpRequestCodes.SUCCESS) {
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
  get<T, P = any>(url: EndpointType, params?: P, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.service.get(url, { params, ...config });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T, P = any>(url: EndpointType, params?: P, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.service.post(url, params, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T, P = any>(url: EndpointType, params?: P, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.service.put(url, params, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T, P = any>(url: EndpointType, params?: P, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.service.delete(url, { params, ...config });
  }

  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }

    this.abortControllerMap.clear();
  }

  /**
   * 取消指定的请求
   * @param url 待取消的请求URL
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];

    for (const key of urlList) {
      this.abortControllerMap.get(key)?.abort();
      this.abortControllerMap.delete(key);
    }
  }

  /**
   * 清理请求完成的AbortController
   * @param url 请求URL
   */
  clearAbortController(url: string) {
    if (this.abortControllerMap.has(url)) {
      this.abortControllerMap.delete(url);
    }
  }
}

export const HttpRequest = new Http(config);
