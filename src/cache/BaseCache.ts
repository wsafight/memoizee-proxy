import { CacheMap, MemoizeCache } from "../interface";
import getMapOrWeakMapByOption from "../utils/getMapOrWeakMapByOption";


/**
 * To clear the data in the cache
 */
export default class BaseCache<V> implements CacheMap<string | object, V> {
  weak: boolean;
  cacheMap: MemoizeCache<V>

  constructor(weak: boolean = false) {
    this.weak = weak
    this.cacheMap = getMapOrWeakMapByOption(this.weak)
  }


  clear(): void {
    if (this.weak) {
      this.cacheMap = new WeakMap()
    } else {
      this.cacheMap.clear!()
    }
  }

  delete(key: string | object): boolean {
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
