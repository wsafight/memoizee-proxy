/**
 * 检测错误并抛出
 * @param condition 是否弹出错误
 * @param message
 */
export function invariant(condition: boolean, errorMsg: string) {
  if (condition) {
    throw new Error(errorMsg);
  }
}