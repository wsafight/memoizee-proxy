import { MemoizeCache, MemoizeOptions } from "./interface";
import { generateKey } from "./utils/generateKey";
import getManualFunForCache from "./getManualFunForCache";
import checkOptionsThenThrowError from "./checkOptions";
import getCacheByOptions from "./getCacheByOptions";

/**
 *
 * @param fn
 * @param options
 */
export default function memoize<T>(fn: (...args: any[]) => T, options?: MemoizeOptions<T>) {
  checkOptionsThenThrowError<T>(options)

  const normalizer = options?.normalizer ?? generateKey

  let cache: MemoizeCache<T> = getCacheByOptions<T>(options)

  // Provides management functions based on the current configuration
  const changedFun: (...args: any[]) => T = options?.manual ?
    getManualFunForCache<T>(fn, cache) :
    fn

  return new Proxy(changedFun, {
    // @ts-ignore
    cache,

    apply(target, thisArg, argsList: any[]): T {

      const currentCache: MemoizeCache<T> = (this as any).cache

      let cacheKey: string | object

      if (options?.weak) {
        // If it is WeakMap, the first data of the parameter
        cacheKey = argsList[0] as object
      } else {
        cacheKey = normalizer(argsList);
      }

      if (!currentCache.has(cacheKey)) {
        let result = target.apply(thisArg, argsList)

        // If it is promise, cache current promise
        if (result?.then) {
          result = Promise.resolve(result).catch(error => {
            // If there is an error, delete the current cache promise, otherwise it will cause a second error
            currentCache.delete(cacheKey)

            // Deriving the promise error
            return Promise.reject(error)
          })
        }
        currentCache.set(cacheKey, result);
      } else if (options?.refCounter) {
        currentCache.addRef?.(cacheKey)
      }
      return currentCache.get(cacheKey) as T;
    }
  });
}