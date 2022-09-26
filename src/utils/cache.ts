import { CacheResult } from "@/hooks/cache/types";

export const getLoadingState = <T>(defaultValue: T): CacheResult<T> => {
  return { state: "loading", loading: true, data: defaultValue };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};
