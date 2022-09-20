/* eslint-disable no-unused-vars */
export type EndpointType = string;

export interface Response<T = any> {
  code: RequestCodes;
  message: string;
  data: T;
}

export interface ResponseError {
  code: RequestCodes;
  message: string;
}

export enum RequestCodes {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}
