import { MemoizeCache } from "./interface";

/**
 * Get the function that can manage the cache manually
 * @param fn
 * @param cache
 */
export default function getManualFunForCache<T>(
  fn: (...args: any[]) => T,
  cache: MemoizeCache<T>
): (...args: any[]) => T {
  // Do not change the original function object
  const result = Object.assign({}, fn)

  Object.defineProperties(result, {
    set: {
      value: (key: string | object, val: T) => cache.set(key, val),
      writable: false
    },
    delete: {
      value: (key: string | object) => cache.delete(key),
      writable: false
    },
    // If there is a deleteRef, add it to the object
    ...cache.deleteRef && {
      deleteRef: {
        value: (key: string | object) => cache.deleteRef!(key),
        writable: false
      }
    }
  })

  return result
}