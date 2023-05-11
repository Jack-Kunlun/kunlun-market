import { randomBytes, pbkdf2Sync } from "crypto";

/**
 * 加密密码迭代次数
 */
const iterations = 10000;

/**
 * 加密后的密码长度
 */
const keylen = 16;

/**
 * 加密方式
 */
const digest = "sha1";

/**
 * Make salt
 */
export const makeSalt = () => {
  return randomBytes(16).toString("base64");
};

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string) {
  const tempSalt = Buffer.from(salt, "base64");

  return pbkdf2Sync(password, tempSalt, iterations, keylen, digest).toString("base64");
}
