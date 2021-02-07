import { CacheMap, MemoizeCache } from "./interface";

export default class RefCache<V> implements CacheMap<string | object, V> {
  // Define static data map as cache pool
  cacheMap: MemoizeCache
  cacheRef: MemoizeCache

  constructor(cacheMap: MemoizeCache) {
    this.cacheMap = cacheMap
    this.cacheRef = cacheMap instanceof WeakMap ? new WeakMap() : new Map()
  }

  delete(key: string | object): boolean {
    this.cacheRef.delete(key)
    this.cacheMap.delete(key)
    return true;
  }

  deleteRef(key: string | object): boolean {
    const refCount: number = this.cacheRef.get(key)
    if (typeof refCount === "number") {
      let currentRefCount = refCount - 1
      if (currentRefCount) {
        this.cacheRef.set(key, currentRefCount)
      } else {
        this.cacheRef.delete(key)
        this.cacheMap.delete(key)
      }
    }
    return true
  }

  get(key: string | object): V | undefined {
    return this.cacheMap.get(key)
  }

  has(key: string | object): boolean {
    const value: number = this.cacheRef.get(key)
    return !!value;
  }

  set(key: string | object, value: V,): this {
    if (!this.has(key)) {
      this.cacheMap.set(key, value)
    }
    this.cacheRef.set(key, (this.cacheRef.get(key) ?? 0) + 1)
    return this
  }

}