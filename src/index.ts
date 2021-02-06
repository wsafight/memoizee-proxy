import { generateKey } from "./generateKey";

interface MapType<K ,V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
}

/**
 * 缓存类型
 */
type MemoizeCache = MapType<string | object, any>

interface MemoizeOptions {
  /** 保证缓存函数参数的唯一性 */
  normalizer?: (args: any[]) => string;
  /** 使用 weakMap */
  weak?: boolean
}


export default function memoize(fn: (...args: any[]) => any, options?: MemoizeOptions) {

  const normalizer = options?.normalizer ?? generateKey

  let cache: MemoizeCache = new Map<string, any>()

  if (options.weak) {
    cache = new WeakMap<object, any>()
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

      let result = target.apply(thisArg, argsList)
      // 如果是 promise 则 cache promise
      if (result?.then) {
        result = Promise.resolve(result).catch(error => {
          // 发生错误，删除当前 promise，否则回引发二次错误
          currentCache.delete(cacheKey)
          return Promise.reject(error)
        })
      }

      if (!currentCache.has(cacheKey)){
        currentCache.set(cacheKey, result);
      }

      return currentCache.get(cacheKey);
    }
  });
}