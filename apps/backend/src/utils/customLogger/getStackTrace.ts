import * as Path from "path";
import * as StackTrace from "stacktrace-js";

export const getStackTrace = (deep = 2) => {
  const stackList = StackTrace.getSync();
  const stackInfo = stackList[deep];

  const lineNumber = stackInfo.lineNumber;
  const columnNumber = stackInfo.columnNumber;
  const fileName = stackInfo.fileName;
  const basename = fileName ? Path.basename(fileName) : "";

  return `${basename}(line: ${lineNumber}, column: ${columnNumber}):`;
};
