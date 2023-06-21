declare global {
  type ServiceType = "admin" | "frontend";

  type Nullable<T> = T | undefined | null;

  interface PagingParameter {
    /**
     * 页码
     */
    current: number;
    /**
     * 每一页的数量
     */
    pageSize: number;
  }

  interface RequestSession {
    cookie: Record<string, any>;
    captchaId?: string;
  }

  interface ResponseResult<T, E> {
    /**
     * 状态码
     */
    code: number;
    /**
     * 数据
     */
    data: T;
    /**
     * 消息
     */
    message: string;
    /**
     * 错误
     */
    error?: E;
  }
}

export {};
