import { CacheMap, DisposeFun } from "../interface";
import CacheWithDispose from "./CacheWithDispose";

/**
 * To clear the data in the cache
 */
export default class Cache<V> extends CacheWithDispose<V, V> implements CacheMap<string | object, V> {

  constructor(weak: boolean = false, dispose: DisposeFun<V> = () => void 0) {
    super(weak, dispose)
  }


  clear(): void {
    if (this.weak) {
      // WeakMap doesn't provide cleanup for the time being
      this.cacheMap = new WeakMap()
    } else {
      this.disposeAllValue(this.cacheMap)
      this.cacheMap.clear!()
    }
  }

  delete(key: string | object): boolean {
    const value: V | undefined = this.cacheMap.get(key)
    super.disposeValue(value)
    return this.cacheMap.delete(key)
  }


  get(key: string | object): V | undefined {
    return this.cacheMap.get(key)
  }

  has(key: string | object): boolean {
    return this.cacheMap.has(key);
  }

  set(key: string | object, value: V): this {
    this.cacheMap.set(key, value)
    return this;
  }
}
