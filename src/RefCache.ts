import { CacheMap, MemoizeCache } from "./interface";

export default class RefCache<V> implements CacheMap<string | object, V> {
  // Define static data map as cache pool
  cacheMap: MemoizeCache
  cacheRef: MemoizeCache

  constructor(cacheMap: MemoizeCache,) {
    this.cacheMap = cacheMap
    this.cacheRef = cacheMap instanceof WeakMap ? new WeakMap() : new Map()
  }

  delete(key: string | object): boolean {
    console.log(key)
    return false;
  }

  get(key: string | object): V | undefined {
    console.log(key)
    return undefined;
  }

  has(key: string | object): boolean {
    console.log(key)
    return false;
  }

  set(key: string | object, value: V,): this {
    console.log(key, value)
    return this;
  }

}