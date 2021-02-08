import { generateKey } from "./utils/generateKey";
import { MemoizeCache, MemoizeOptions } from "./interface";
import ExpiredCache from "./cache/ExpiredCache";
import RefCache from "./cache/RefCache";
import { invariant } from "./utils/inveriant";
import setPropertiesForCache from "./setProperties";


export default function memoize<T>(fn: (...args: any[]) => T, options?: MemoizeOptions) {

  const normalizer = options?.normalizer ?? generateKey

  let cache: MemoizeCache = new Map<string, T>()

  if (options?.weak) {
    cache = new WeakMap<object, T>()
  }

  invariant(
    typeof options?.maxAge === 'number' && options?.refCounter === true,
    'arguments maxAge and refCounter cannot exist at the same time'
  )


  if (options?.refCounter) {
    cache = new RefCache<T>(cache)
  }

  if (typeof options?.maxAge === "number" && options.maxAge > 0) {
    cache = new ExpiredCache<T>(cache, options.maxAge)
  }

  setPropertiesForCache<T>(fn, cache)

  return new Proxy(fn, {
    // @ts-ignore
    cache,

    apply(target, thisArg, argsList: any[]): T {

      const currentCache: MemoizeCache = (this as any).cache

      let cacheKey: string | object

      if (options?.weak) {
        // If it is WeakMap, the first data of the parameter
        cacheKey = argsList[0] as object
      } else {
        cacheKey = normalizer(argsList);
      }

      if (!currentCache.has(cacheKey)) {
        let result = target.apply(thisArg, argsList)

        //If it is promise, cache current promise
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
        currentCache.set(cacheKey, currentCache.get(cacheKey))
      }

      return currentCache.get(cacheKey);
    }
  });
}