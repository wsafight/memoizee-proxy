import { generateKey } from "./generateKey";
import { MemoizeCache, MemoizeOptions } from "./interface";
import ExpriesCache from "./ExpriesCache";


export default function memoize(fn: (...args: any[]) => any, options?: MemoizeOptions) {

  const normalizer = options?.normalizer ?? generateKey

  let cache: MemoizeCache = new Map<string, any>()

  if (options.weak) {
    cache = new WeakMap<object, any>()
  }

  if (typeof options.timeout === "number" && options.timeout > 0) {
    cache = new ExpriesCache<any>(cache, options.timeout)
  }

  return new Proxy<any>(fn, {
    // @ts-ignore
    cache,
    apply(target, thisArg, argsList: any[]) {

      const currentCache: MemoizeCache = (this as any).cache

      let cacheKey: string | object

      if (options.weak) {
        // 如果是 weakMap，则取得第一个数值
        cacheKey = argsList[0] as Record<string, any>
      } else {
        cacheKey = normalizer(argsList);
      }

      if (!currentCache.has(cacheKey)){

        let result = target.apply(thisArg, argsList)
        // 如果是 promise 则 cache promise
        if (result?.then) {
          result = Promise.resolve(result).catch(error => {
            // 发生错误，删除当前 promise，否则会引发二次错误
            currentCache.delete(cacheKey)
            return Promise.reject(error)
          })
        }

        currentCache.set(cacheKey, result);
      }
      return currentCache.get(cacheKey);
    }
  });
}