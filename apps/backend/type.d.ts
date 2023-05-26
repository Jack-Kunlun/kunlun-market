declare global {
  type ServiceType = "admin" | "frontend";

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

  interface ResponseResult<T, E> {
    code: number;
    data: T;
    message: string;
    error?: E;
  }
}

export {};
