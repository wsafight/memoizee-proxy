import { CacheMap, MemoizeCache } from "../interface";
import getMapOrWeakMapByOption from "../utils/getMapOrWeakMapByOption";

export default class RefCache<V> implements CacheMap<string | object, V> {
  // Define static data map as cache pool
  readonly weak: boolean
  cacheMap: MemoizeCache<V>
  cacheRef: MemoizeCache<number>

  constructor(weak: boolean = false) {
    this.weak = weak
    this.cacheMap = getMapOrWeakMapByOption(weak)
    this.cacheRef = getMapOrWeakMapByOption(weak)
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

  set(key: string | object, value: V): this {
    this.cacheMap.set(key, value)
    this.addRef(key)
    return this
  }

  addRef(key: string | object) {
    if (!this.cacheMap.has(key)) {
      return
    }
    const refCount: number | undefined = this.cacheRef.get(key)
    this.cacheRef.set(key, (refCount ?? 0) + 1)
  }

  deleteRef(key: string | object): boolean {
    if (!this.cacheMap.has(key)) {
      return false
    }
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

  clear() {
    if (this.weak) {
      this.cacheMap = getMapOrWeakMapByOption(true)
    } else {
      this.cacheMap.clear!()
    }
  }
}