import { CacheMap, DisposeFun, MemoizeCache } from "../interface";
import BaseCacheWithDispose from "./BaseCacheWithDispose";

export default class RefCache<V> extends BaseCacheWithDispose<V, V> implements CacheMap<string | object, V> {
  cacheRef: MemoizeCache<number>

  constructor(weak: boolean = false, dispose: DisposeFun<V> = () => void 0) {
    super(weak, dispose)
    this.cacheRef = this.getMapOrWeakMapByOption<number>()
  }

  delete(key: string | object): boolean {
    this.disposeValue(this.get(key))
    this.cacheRef.delete(key)
    this.cacheMap.delete(key)
    return true;
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

  getRefCount(key: string | object) {
    return this.cacheRef.get(key) ?? 0
  }

  deleteRef(key: string | object): boolean {
    if (!this.cacheMap.has(key)) {
      return false
    }

    const refCount: number = this.getRefCount(key)

    if (refCount <= 0) {
      return false
    }

    const currentRefCount = refCount - 1
    if (currentRefCount > 0) {
      this.cacheRef.set(key, currentRefCount)
    } else {
      this.cacheRef.delete(key)
      this.cacheMap.delete(key)
    }
    return true
  }

  clear() {
    if (this.weak) {
      this.cacheRef = new WeakMap()
      this.cacheMap = new WeakMap()
    } else {
      this.disposeAllValue(this.cacheMap)
      this.cacheRef.clear!()
      this.cacheMap.clear!()
    }
  }
}