import { readdirSync, statSync } from "fs";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";

// // 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);

// // 获取当前模块的目录路径
const __dirname = dirname(__filename);
const pageFilePath = resolve(__dirname, "..", "src/pages");

const whiteList = ["404.tsx", "Login", "components"];

// 递归读取文件目录的函数
const readDirectoryRecursive = (directoryPath: string, parent?: string) => {
  const files = readdirSync(directoryPath);
  const list: string[] = [];

  files.forEach((file) => {
    // 白名单内的文件不需要被采集
    if (!whiteList.includes(file)) {
      const filePath = join(directoryPath, file);
      const fileStat = statSync(filePath);

      if (fileStat.isDirectory()) {
        // 如果是文件夹，则继续递归处理
        const childFiles = readDirectoryRecursive(filePath, `${parent ? `${parent}` : "@/pages"}/${file}`);

        list.push(...childFiles);
      } else {
        // 命名为index.(tsx | jsx)的才认为他是一个页面
        if (file === "index.tsx" || file === "index.jsx") {
          const pageFile = parent ? parent : `@/pages/${file}`;

          list.push(pageFile);
        }
      }
    }
  });

  return list;
};

const fileList = readDirectoryRecursive(pageFilePath);

export { fileList };
