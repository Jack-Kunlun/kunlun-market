/**
 * @description 错误处理方法
 * @param {number} code
 */
export const handleCode = (code: number, message: string) => {
  //   TODO: 需要完善对于http请求的不同code的处理
  // eslint-disable-next-line no-console
  console.error(`${code}-${message}`);

  //   switch (code) {
  //     case 401:
  //       // eslint-disable-next-line no-console
  //       console.error(message);
  //       break;
  //     case 404:
  //       // eslint-disable-next-line no-console
  //       console.error(message);
  //       break;
  //     default:
  //       // eslint-disable-next-line no-console
  //       console.error(message);
  //       break;
  //   }
};
