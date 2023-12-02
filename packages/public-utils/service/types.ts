/* eslint-disable no-unused-vars */
export type EndpointType = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HttpResponse<T = any> {
  code: HttpRequestCodes;
  message: string;
  data: T;
}

export interface HttpResponseError {
  error: string;
  message: string;
  status: number;
}

export enum HttpRequestCodes {
  SUCCESS = 200,
  FAIL = 999, // 请求失败
  EXPIRED = 600, // 登录过期
  UNAUTHORIZED = 401, // 未授权
}
