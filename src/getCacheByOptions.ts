import { MemoizeCache, MemoizeOptions } from "./interface";
import ExpiredLRUCache from "./cache/ExpiredLRUCache";
import RefCache from "./cache/RefCache";
import BaseCache from "./cache/BaseCache";

export default function getCacheByOptions<V>(options?: MemoizeOptions<V>): MemoizeCache<V> {
  if (!options) {
    return new BaseCache(false)
  }

  if (typeof options.max === 'number' || typeof options.maxAge === "number") {
    return new ExpiredLRUCache({
      weak: options.weak,
      ...options.max && {
        max: options.max
      },
      ...options.maxAge && {
        maxAge: options.maxAge
      }
    })
  }

  if (options.refCounter) {
    return new RefCache<V>(options.weak ?? false)
  }

  return new BaseCache(options.weak)
}