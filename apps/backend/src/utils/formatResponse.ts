type FormatResponseProps<T, E> = Partial<ResponseResult<T, E>>;

export const formatResponse = <T, E>(params: FormatResponseProps<T, E> = {}): ResponseResult<T, E> => {
  const { code = 200, message = "Success", data = null, error } = params;

  return {
    code,
    message,
    data,
    error,
  };
};
