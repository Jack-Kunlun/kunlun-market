/* eslint-disable no-unused-vars */
import { AxiosResponse, AxiosError } from "axios";

export type EndpointType = string;

export interface SuccessHandler<T> {
  (res: AxiosResponse<T>): void;
}

export interface ErrorHandler<T = any> {
  (error: AxiosError<T>): void;
}
