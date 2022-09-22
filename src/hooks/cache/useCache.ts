import { useEffect, useMemo, useRef, useState } from "react";
import { CacheOptions, CacheKey, CacheResult, Nullable } from "./types";
import { ResponseError } from "@/utils";
import { getLoadingState, noop } from "@/utils/cache";

const infinity = 5 * 30 * 1000;

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

  const init = (key: Nullable<CacheKey>, fetch: () => Promise<T>) => {
    if (typeof key === "undefined" || key === null) {
      return { ...loadingState, refresh: noop };
    }

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>(defaultValue);
    const [error, setError] = useState<ResponseError>();

    const initrd = useRef(false);

    const getValue = useMemo(() => {
      const value = get(key);

      return value;
    }, [loading, data, error]);

    const refresh = () => {
      // console.log("refresh");
      // set(key, { loading, data: defaultValue });
      fetch()
        .then((data) => {
          setData(data);
          // set(key, { loading: false, data });
        })
        .catch((error) => {
          setError(error);
          // set(key, { loading: false, error });
        })
        .finally(() => {
          setLoading(false);
        });
    };

    refreshers.set(key, refresh);

    useEffect(() => {
      if (!initrd.current) {
        initrd.current = true;
        refresh();
      }
    }, []);

    return {
      ...getValue,
      refresh,
    };
  };

  return { init, set, get };
};
