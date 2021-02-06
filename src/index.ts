import { generateKey } from "./generateKey";
import { MemoizeCache, MemoizeOptions } from "./interface";
import ExpiredCache from "./ExpiredCache";


export default function memoize<T>(fn: (...args: any[]) => T, options?: MemoizeOptions) {

  const normalizer = options?.normalizer ?? generateKey

  let cache: MemoizeCache = new Map<string, T>()

  if (options.weak) {
    cache = new WeakMap<object, T>()
  }

  if (typeof options.timeout === "number" && options.timeout > 0) {
    cache = new ExpiredCache<T>(cache, options.timeout)
  }

  return new Proxy(fn, {
    // @ts-ignore
    cache,

    apply(target, thisArg, argsList: any[]): T {

      const currentCache: MemoizeCache = (this as any).cache

      let cacheKey: string | object

      if (options.weak) {
        // 如果是 weakMap，则取得第一个数值
        cacheKey = argsList[0] as object
      } else {
        cacheKey = normalizer(argsList);
      }

      if (!currentCache.has(cacheKey)){
        console.log('zzzz')
        let result = target.apply(thisArg, argsList)

        // 如果是 promise 则缓存 promise
        if (result?.then) {
          result = Promise.resolve(result).catch(error => {
            // 发生错误，删除当前 promise，否则会引发二次错误
            currentCache.delete(cacheKey)
            // 把 promise 错误衍生出去
            return Promise.reject(error)
          })
        }
        currentCache.set(cacheKey, result);
      }
      return currentCache.get(cacheKey);
    }
  });
}