interface FormatResponseProps<T, E> {
  code?: number;
  data: T;
  message?: string;
  error?: E;
}

export const formatResponse = <T, E>({
  code = 200,
  data,
  message = "Success",
  error,
}: FormatResponseProps<T, E>): ResponseResult<T, E> => ({
  code,
  message,
  data,
  error,
});
