import { useEffect, useMemo, useRef, useState } from "react";
import { CacheOptions, CacheKey, CacheResult, Nullable } from "./types";
import { ResponseError } from "@/utils";
import { getLoadingState, noop } from "@/utils/cache";

const infinity = 5 * 60 * 1000;

export const useCache = <T>({ defaultValue, ...options }: CacheOptions<T>) => {
  const temp = new Map<CacheKey, CacheResult<T>>();
  const cache = new Map<CacheKey, { time: number; value: CacheResult<T>; maxAge: number }>();
  const refreshers = new Map<CacheKey, () => void>();
  const loadingState = getLoadingState(defaultValue);

  const set = (key: CacheKey, data: CacheResult<T>, maxAge?: number) => {
    temp.delete(key);
    cache.set(key, { time: Date.now(), value: data, maxAge: maxAge ?? options.maxAge ?? infinity });
  };

  const get = (key: CacheKey): CacheResult<T> | undefined => {
    const current = cache.get(key);
    const now = Date.now();
    const doDispose = current ? current.time + current.maxAge <= now : false;

    if (doDispose && current) {
      cache.delete(key);
      // eslint-disable-next-line no-console
      console.log("disposing", { key, current });

      if (!current.value.error) {
        temp.set(key, current.value);

        // Refresh data that has passed its maxAge automatically:
        if (refreshers.has(key)) {
          refreshers.get(key)?.();
        }
      }
    }

    return cache.get(key)?.value ?? current?.value;
  };

  /**
   * @description
   * @param {Nullable<CacheKey>} key
   * @param {() => Promise<T>} fetch
   * @return {*}
   */
  const init = (key: Nullable<CacheKey>, fetch: () => Promise<T>) => {
    if (typeof key === "undefined" || key === null) {
      return { ...loadingState, refresh: noop };
    }

    const value = get(key);

    const initrd = useRef(false);

    const [data, setData] = useState<T>();
    const [error, setError] = useState<ResponseError>();

    const refresh = () => {
      // console.log("refresh");
      // set(key, { loading, data: defaultValue });
      set(key, { loading: true, data: defaultValue, state: "loading" });
      fetch()
        .then((data) => {
          setData(data);
          // set(key, { loading: false, data, state: "success" });
        })
        .catch((error) => {
          setError(error);
          set(key, { loading: false, error, state: "error" });
        });
    };

    refreshers.set(key, refresh);

    const finalValue = useMemo(() => {
      return get(key);
    }, [data, error]);

    /**
     * @description 初始化数据
     * value: 当前数据集合中是否存在，存在则直接使用旧值
     * initrd: 防止重复请求数据
     */
    useEffect(() => {
      if (!value && !initrd.current) {
        initrd.current = true;
        refresh();
      }
    }, []);

    return {
      ...finalValue,
      refresh,
    };
  };

  return { init, set, get };
};
