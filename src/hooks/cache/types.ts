import { ResponseError } from "@/utils";

export type Nullable<T> = T | undefined | null;

export type CacheKey = string | number;

export interface CacheOptions<T> {
  defaultValue: T;
  maxAge?: number;
  // eslint-disable-next-line no-unused-vars
  dispose?: (key: CacheKey, value: T) => void;
}

export type State = "loading" | "error" | "success";

export interface CacheResult<T> {
  state: State;
  loading: boolean;
  data?: T;
  error?: ResponseError;
}
