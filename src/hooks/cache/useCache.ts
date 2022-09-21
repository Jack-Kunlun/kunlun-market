import { useEffect, useState } from "react";

export interface CacheOptions {
  cacheTime: string;
}

export const useCache = <T>() => {
  const valueMap = new Map<string | number, T>();

  const init = (key: string, fetch: () => Promise<T>) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const refresh = () => {
      setLoading(true);
      fetch()
        .then((res) => {
          setData(res);
          valueMap.set(key, res);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      refresh();
    }, [key]);

    return {
      data,
      error,
      loading,
      refresh,
    };
  };

  return { init };
};
