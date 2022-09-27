import { safeHeight } from "./safeHeight";

/**
 * windicss无法识别字符串拼接的class名称，你必须使用工具类的全名才可以识别。
 * 有时，你必须使用动态拼接，这时你需要将他们加入safelist白名单，就像这样
 * safelist: 'p-1 p-2 p-3 p-4'
 * 具体详情可以查看 https://windicss.org/guide/extractions.html
 */
export const safelist = [safeHeight];
