import { MemoizeCache, MemoizeOptions } from "./interface";
import ExpiredLRUCache from "./cache/ExpiredLRUCache";
import RefCache from "./cache/RefCache";
import Cache from "./cache/Cache";
import ExpiredLFUCache, { QuickLFUOptions } from "./cache/ExpiredLFUCache";

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

  if (typeof options.LFU === 'boolean' && options.LFU) {
    const currentOptions: QuickLFUOptions<V> = {}
    if (options.max === 'number' ) {
      currentOptions.capacity = options.max
    }
    if (options.maxAge === 'number') {
      currentOptions.maxAge = options.maxAge
    }
    if (options.dispose) {
      currentOptions.dispose = options.dispose
    }
    return new ExpiredLFUCache(currentOptions)
  }

  if (options.refCounter) {
    return new RefCache<V>(options.weak ?? false, options.dispose)
  }

  return new Cache(options.weak, options.dispose)
}