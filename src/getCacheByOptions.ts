import { MemoizeCache, MemoizeOptions } from "./interface";
import ExpiredLRUCache from "./cache/ExpiredLRUCache";
import RefCache from "./cache/RefCache";
import Cache from "./cache/Cache";

export default function getCacheByOptions<V>(options?: MemoizeOptions<V>): MemoizeCache<V> {
  if (!options) {
    return new Cache(false)
  }

  if (typeof options.max === 'number' || typeof options.maxAge === "number") {
    return new ExpiredLRUCache({
      weak: options.weak,
      ...options.max && {
        max: options.max
      },
      ...options.maxAge && {
        maxAge: options.maxAge
      },
      ...options.dispose && {
        dispose: options.dispose
      }
    })
  }

  if (options.refCounter) {
    return new RefCache<V>(options.weak ?? false, options.dispose)
  }

  return new Cache(options.weak, options.dispose)
}