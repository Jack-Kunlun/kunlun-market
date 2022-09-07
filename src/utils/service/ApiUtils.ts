/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import service from "./Service";
import { EndpointType, ErrorHandler, SuccessHandler } from "./types";

const httpget = <R>(
  url: EndpointType,
  onSuccess?: SuccessHandler<R>,
  onFailure?: ErrorHandler,
  config?: AxiosRequestConfig
) => {
  service({ url, method: "GET", ...config })
    .then((res) => {
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(res);
      }
    })
    .catch((err) => {
      if (onFailure && typeof onFailure === "function") {
        onFailure(err);
      }
    });
};

const httppost = <R, D = any>(
  url: EndpointType,
  data: D,
  onSuccess?: SuccessHandler<R>,
  onFailure?: ErrorHandler,
  config?: AxiosRequestConfig
) => {
  service({ url, data, method: "POST", ...config })
    .then((res) => {
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(res);
      }
    })
    .catch((err) => {
      if (onFailure && typeof onFailure === "function") {
        onFailure(err);
      }
    });
};

export { httpget, httppost };
