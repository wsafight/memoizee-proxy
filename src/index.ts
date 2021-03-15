import { MemoizeCache, MemoizeOptions, ResultFun, TargetFun } from "./interface";
import generateKey from "./utils/generateKey";
import checkOptionsThenThrowError from "./checkOptions";
import getCacheByOptions from "./getCacheByOptions";
import getManualActionObjFormCache from "./getManualActionObjFormCache";
import invariant from "./utils/inveriant";

function getKeyFromArguments(argsList: any[], normalizer: (args: any[]) => string, weak: boolean = false): object | string {
  return weak ? argsList[0] as object : normalizer(argsList)
}


function getCacheUseController(resetCallback: () => void) {
  let closeable: boolean = false

  const handleCacheOpen = () => closeable = false

  const handleCacheClose = () => {
    resetCallback()
    closeable = true
  }

  return {
    closeable,
    handleCacheOpen,
    handleCacheClose
  }

}


/**
 *
 * @param fn
 * @param options
 */
export function memoizee<V>(fn: TargetFun<V>, options?: MemoizeOptions<V>): ResultFun<V> {
  checkOptionsThenThrowError<V>(options)


  const normalizer = options?.normalizer ?? generateKey

  let cache: MemoizeCache<V> = getCacheByOptions<V>(options)


  const {
    closeable,
    handleCacheClose,
    handleCacheOpen
  } = getCacheUseController(() => {
    cache = getCacheByOptions<V>(options)
  })


  return new Proxy(fn, {
    // @ts-ignore
    cache,
    get: (target: TargetFun<V>, property: string) => {
      if (options?.manual) {
        const manualTarget = getManualActionObjFormCache<V>(cache)
        if (Reflect.has(manualTarget, property)) {
          return Reflect.get(manualTarget, property);
        }
      }
      if (options?.closeable) {
        if (property === 'handleCacheClose') {
          return handleCacheClose
        }
        if (property === 'handleCacheOpen') {
          return handleCacheOpen
        }
      }
      return Reflect.get(target, property);
    },
    apply(target, thisArg, argsList: any[]): V {

      if (closeable) {
        return target.apply(thisArg, argsList)
      }

      const currentCache: MemoizeCache<V> = (this as any).cache

      const cacheKey: string | object = getKeyFromArguments(argsList, normalizer, options?.weak)

      invariant(
        !!options?.weak && Object.prototype.toString.call(cacheKey).slice(8, -1) !== 'Object',
        'WeakMap key value must be an object'
      )

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
