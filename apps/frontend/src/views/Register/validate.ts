import type { Rule } from "ant-design-vue/es/form";
import { validatePassword, validatePhone, validateEmail } from "public-utils/validator";

export const validatePass = (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input the password");
  }

  if (!validatePassword(value)) {
    return Promise.reject(
      "Password must contain at least 8 characters, including at least 1 number, 1 uppercase letter and 1 lowercase letter"
    );
  }

  return Promise.resolve();
};

export const _validatePhone = (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input your phone number");
  }

  if (!validatePhone(value)) {
    return Promise.reject("Please input the correct phone number");
  }

  return Promise.resolve();
};

export const _validateEmail = (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input your email");
  }

  if (!validateEmail(value)) {
    return Promise.reject("Please input the correct email");
  }

  return Promise.resolve();
};
