type FormatResponseProps<T, E> = Partial<ResponseResult<T, E>>;

type FormatResponseResult<T = null, E = undefined> = T extends null ? ResponseResult<null, E> : ResponseResult<T, E>;

/**
 * 格式化返回数据
 * @param params
 * @returns
 */
export const formatResponse = <T = null, E = undefined>(params: FormatResponseProps<T, E> = {}) => {
  const { code = 200, message = "Success", data, error } = params;

  return {
    code,
    data,
    message,
    error,
  } as FormatResponseResult<T, E>;
};
