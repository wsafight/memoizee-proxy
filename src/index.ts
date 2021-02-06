import { generateKey } from "./generateKey";

interface MemoizeOptions {
  /** 保证缓存函数参数的唯一性 */
  normalizer?: (args: any[]) => string;
  /** 使用 weakMap */
  weak?: boolean
}


export default function memoize(fn: (...args: any[]) => any, options?: MemoizeOptions) {

  const normalizer = options?.normalizer ?? generateKey

  let cache: Map<string, any> | WeakMap<object, any> = new Map<string, any>()

  if (options.weak) {
    cache = new WeakMap<object, any>()
  }

  return new Proxy<any>(fn, {
    // @ts-ignore
    cache,
    apply(target, thisArg, argsList: any[]) {
      const currentCache: Map<string, any> = (this as any).cache
      const cacheKey: string = normalizer(argsList);
      let result = target.apply(thisArg, argsList)
      // 如果是 promise 则 cache promise
      if (result?.then) {
        result = Promise.resolve(result).catch(error => {
          // 发生错误，删除当前 promise，否则回引发二次错误
          currentCache.delete(cacheKey)
          return Promise.reject(error)
        })
      }
      if (!currentCache.has(cacheKey))
        currentCache.set(cacheKey, result);
      return currentCache.get(cacheKey);
    }
  });
}