import { useCache } from "@/hooks/cache/useCache";
import { HttpRequest } from "@/utils";

const loginCache = useCache<string>({ defaultValue: "", maxAge: 5 * 30 * 1000 });

const doLogin = () => {
  return new Promise<string>((resolve, reject) => {
    HttpRequest.get<string>("/api/login")
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getLogin = () => {
  return loginCache.init("login", doLogin);
};
