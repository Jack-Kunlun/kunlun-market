/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosPromise } from "axios";
import { httpget, httppost } from "./ApiUtils";
import { EndpointType } from "./types";

const httpgetPromise = <R = any>(url: EndpointType): AxiosPromise<R> => {
  return new Promise((resolve, reject) => {
    httpget(
      url,
      (res: any) => resolve(res),
      (err) => reject(err)
    );
  });
};

const httppostPromise = <R, D = any>(url: EndpointType, data: D): AxiosPromise<R> => {
  return new Promise((resolve, reject) => {
    httppost(
      url,
      data,
      (res: any) => resolve(res),
      (err) => reject(err)
    );
  });
};

export { httpgetPromise, httppostPromise };
