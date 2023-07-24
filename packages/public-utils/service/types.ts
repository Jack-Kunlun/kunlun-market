/* eslint-disable no-unused-vars */
export type EndpointType = string;

export interface HttpResponse<T = any> {
  code: HttpRequestCodes;
  message: string;
  data: T;
}

export interface HttpResponseError {
  error: string;
  message: string;
  statusCode: number;
}

export enum HttpRequestCodes {
  SUCCESS = 200,
  FAIL = 999, // 请求失败
  EXPIRED = 600, // 登录过期
}
