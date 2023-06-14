type FormatResponseProps<T, E> = Partial<ResponseResult<T, E>>;

/**
 * 格式化返回数据
 * @param params
 * @returns
 */
export const formatResponse = <T, E>(params: FormatResponseProps<T, E> = {}): ResponseResult<T, E> => {
  const { code = 200, message = "Success", data = null, error } = params;

  return {
    code,
    data,
    message,
    error,
  };
};
