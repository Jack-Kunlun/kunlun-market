import { ResponseError } from "public-utils";
import { CacheKey, CacheResult } from "./types";

export const infinity = 5 * 60 * 1000;

export const getLoadingState = <T>(defaultValue: T): CacheResult<T> => {
  return { state: "loading", loading: true, data: defaultValue };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const getCacheKeys = (key?: CacheKey): CacheKey[] => {
  if (typeof key === "undefined" || key === null) {
    return [];
  }

  if (typeof key === "number") {
    return [key];
  }

  return key.trim().split(/\n\s*/g);
};

export const getErrorState = <T>(defaultValue: T, error: ResponseError): CacheResult<T> => {
  return { state: "error", loading: false, data: defaultValue, error };
};
