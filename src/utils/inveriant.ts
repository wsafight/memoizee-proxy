/**
 * 检测错误并抛出
 * @param condition 是否抛出错误
 * @param errorMsg
 */
export default function invariant(condition: boolean, errorMsg: string) {
  if (condition) {
    throw new Error(errorMsg);
  }
}