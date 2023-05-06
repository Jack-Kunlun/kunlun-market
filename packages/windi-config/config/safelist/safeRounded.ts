import { range } from "public-utils";

// 需要加入白名单的size放在这里
const size = ["lg", "md", "sm"];

export const safeRounded = range(size, "rounded");
