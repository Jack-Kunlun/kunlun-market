import { useEffect, useMemo, useState } from "react";
import { ResponseError } from "@/utils";

const infinity = 5 * 30 * 1000;

type CacheKey = string | number;

interface CacheOptions<T> {
  defaultValue: T;
  maxAge?: number;
  // eslint-disable-next-line no-unused-vars
  dispose?: (key: CacheKey, value: T) => void;
}

interface CacheResult<T> {
  loading: boolean;
  data?: T;
  error?: ResponseError;
}

export const useCache = <T>({ defaultValue, ...options }: CacheOptions<T>) => {
  const temp = new Map<CacheKey, CacheResult<T>>();
  const cache = new Map<CacheKey, { time: number; value: CacheResult<T>; maxAge: number }>();
  const refreshers = new Map<CacheKey, () => void>();

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

  const init = (key: CacheKey, fetch: () => Promise<T>) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>(defaultValue);
    const [error, setError] = useState<ResponseError>();

    set(key, { loading, data });

    const getValue = useMemo(() => {
      const value = get(key);

      return value;
    }, [loading, data, error]);

    const refresh = () => {
      fetch()
        .then((data) => {
          setData(data);
          set(key, { loading: false, data });
        })
        .catch((error) => {
          setError(error);
          set(key, { loading: false, error });
        })
        .finally(() => {
          setLoading(false);
        });
    };

    refreshers.set(key, refresh);

    useEffect(() => {
      refresh();
    }, []);

    return {
      ...getValue,
      refresh,
    };
  };

  return { init, set, get };
};
