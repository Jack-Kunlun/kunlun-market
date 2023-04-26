/**
 * 将高度相关的size加入白名单。
 */
import { range } from "../../../src/utils";

// 需要加入白名单的size放在这里
const size = ["lg", "md", "sm"];

export const safeHeight = range(size, "h");
