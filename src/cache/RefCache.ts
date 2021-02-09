import { CacheMap, MemoizeCache } from "../interface";

export default class RefCache<V> implements CacheMap<string | object, V> {
  // Define static data map as cache pool
  cacheMap: MemoizeCache<V>
  cacheRef: MemoizeCache<number>

  constructor(weak: boolean) {
    this.cacheMap = weak ? new WeakMap() : new Map()
    this.cacheRef = weak ? new WeakMap() : new Map()
  }

  delete(key: string | object): boolean {
    this.cacheRef.delete(key)
    this.cacheMap.delete(key)
    return true;
  }

  get(key: string | object): V | undefined {
    return this.cacheMap.get(key)
  }

  has(key: string | object): boolean {
    const value: number | undefined = this.cacheRef.get(key)
    return !!value;
  }

  set(key: string | object, value: V,): this {
    if (!this.has(key)) {
      this.cacheMap.set(key, value)
    }
    this.addRef(key)
    return this
  }

  addRef(key: string | object) {
    const refCount: number | undefined = this.cacheRef.get(key)
    this.cacheRef.set(key, (refCount ?? 0) + 1)
  }

  deleteRef(key: string | object): boolean {
    const refCount: number | undefined = this.cacheRef.get(key)
    if (typeof refCount === "number") {
      const currentRefCount = refCount - 1
      if (currentRefCount > 0) {
        this.cacheRef.set(key, currentRefCount)
      } else {
        this.cacheRef.delete(key)
        this.cacheMap.delete(key)
      }
    }
    return true
  }



}