import { CacheMap, DisposeFun } from "../interface";
import BaseCacheWithDispose from "./BaseCacheWithDispose";

/**
 * To clear the data in the cache
 */
export default class Cache<V> extends BaseCacheWithDispose<V, V> implements CacheMap<string | object, V> {

  constructor(weak: boolean = false, dispose: DisposeFun<V> = () => void 0) {
    super(weak, dispose)
  }

  get(key: string | object): V | undefined {
    return this.cacheMap.get(key)
  }

  set(key: string | object, value: V): this {
    this.cacheMap.set(key, value)
    return this;
  }

  delete(key: string | object): boolean {
    const value: V | undefined = this.cacheMap.get(key)
    super.disposeValue(value)
    return this.cacheMap.delete(key)
  }



}
