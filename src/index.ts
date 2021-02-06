import { generateKey } from "./generateKey";

interface MemoizeOptions {
  /** 保证缓存函数参数的唯一性 */
  normalizer?: (args: any[]) => string;
  /** 缓存异步函数 */
  async?: boolean
}



function memoize  (fn: (...args: any[]) => any, options?: MemoizeOptions) {

  const normalizer = options?.normalizer ?? generateKey

  const cache = new Map<string, any>()

  return new Proxy<any>(fn, {
    // @ts-ignore
    cache,
    apply(target, thisArg, argsList: any[]) {
      const currentCache: Map<string, any> = (this as any).cache
      const cacheKey: string = normalizer(argsList);
      let result = target.apply(thisArg, argsList)
      // 如果当前是 promise 异步
      if (target?.then) {
        result = result.catch(error => {
          currentCache.delete(cacheKey)
          console.log(error)
          // return Promise.reject(error)
        })
      }
      if (!currentCache.has(cacheKey))
        currentCache.set(cacheKey, result);
      return currentCache.get(cacheKey);
    }
  });
}


var afn = function(a, b) {
  return new Promise(function(res,reject) {
    res(a + b);
  });
};
var memoized = memoize(afn);

memoized(3, 7);
memoized(3, 7);