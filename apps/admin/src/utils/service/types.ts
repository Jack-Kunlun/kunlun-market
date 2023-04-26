/* eslint-disable no-unused-vars */
export type EndpointType = string;

export interface Response<T = any> {
  code: RequestCodes;
  message: string;
  data: T;
}

export interface ResponseError {
  error: string;
  message: string;
  statusCode: number;
}

export enum RequestCodes {
  SUCCESS = 200,
  FAIL = 999, // 请求失败
  EXPIRED = 600, // 登录过期
}
