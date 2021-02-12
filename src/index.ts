import { MemoizeCache, MemoizeOptions, ResultFun, TargetFun } from "./interface";
import generateKey from "./utils/generateKey";
import checkOptionsThenThrowError from "./checkOptions";
import getCacheByOptions from "./getCacheByOptions";
import getManualActionObjFormCache from "./getManualActionObjFormCache";

/**
 *
 * @param fn
 * @param options
 */
export default function memoize<V>(fn: TargetFun<V>, options?: MemoizeOptions<V>): ResultFun<V> {
  checkOptionsThenThrowError<V>(options)

  const normalizer = options?.normalizer ?? generateKey

  let cache: MemoizeCache<V> = getCacheByOptions<V>(options)

  return new Proxy(fn, {
    // @ts-ignore
    cache,
    get:  (target: TargetFun<V>,property: string) => {
      if (options?.manual) {
        const manualTarget = getManualActionObjFormCache<V>(cache)
        if (property in manualTarget) {
          return manualTarget[property]
        }
      }
      return target[property]
    },
    apply(target, thisArg, argsList: any[]): V {

      const currentCache: MemoizeCache<V> = (this as any).cache

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
      return currentCache.get(cacheKey) as V;
    }
  }) as any
}