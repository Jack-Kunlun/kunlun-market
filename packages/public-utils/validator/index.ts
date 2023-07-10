/**
 * 校验密码的正则表达式，密码必须包含大小写字母和数字，长度为8-16位，只能使用以下特殊字符：.-_!
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.\-_!]{8,16}$/;

export const validatePassword = (password: string) => {
  if (password === "") {
    return false;
  }

  return passwordRegex.test(password);
};

export const validatePhone = (phone: string) => {
  if (phone === "") {
    return false;
  }

  return /^1[3456789]\d{9}$/.test(phone);
};

export const validateEmail = (email: string) => {
  if (email === "") {
    return false;
  }

  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
};
