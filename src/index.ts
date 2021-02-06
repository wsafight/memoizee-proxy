import { generateKey } from "./generateKey";

interface MemoizeOptions {
  /** 保证缓存函数参数的唯一性 */
  normalizer?: (args: any[]) => string;
  /** 缓存异步函数 */
  async?: boolean
}



export default function memoize  (fn: (...args: any[]) => any, options: MemoizeOptions) {

  const normalizer = options?.normalizer ?? generateKey

  const cache = new Map<string, any>()

  return new Proxy<any>(fn, {
    // @ts-ignore
    cache,
    apply(target, thisArg, argsList: any[]) {
      const cache: Map<string, any> = (this as any).cache
      const cacheKey: string = normalizer(argsList);
      if (!cache.has(cacheKey))
        cache.set(cacheKey, target.apply(thisArg, argsList));
      return cache.get(cacheKey);
    }
  });
}
