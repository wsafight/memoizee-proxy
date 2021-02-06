const generateKeyError = new Error("Can't generate key from function argument")

// 根据参数生成生成 key 值
export function generateKey(argument: any[]): string {
  // 从arguments 中取得数据然后变为数组
  const params = Array.from(argument).join(',')

  try{
    // 返回 字符串，函数名 + 函数参数
    return `${params}`
  }catch(_) {
    // 返回生成key错误
    throw generateKeyError
  }
}