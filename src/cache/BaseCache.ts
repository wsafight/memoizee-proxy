import { MemoizeCache } from "../interface";

export default class BaseCache<V> {
  readonly weak: boolean;
  cacheMap: MemoizeCache<V>

  constructor(weak: boolean = false) {
    this.weak = weak
    this.cacheMap = this.getMapOrWeakMapByOption()
  }

  getMapOrWeakMapByOption<T>(): Map<string, T> | WeakMap<object, T>  {
    return this.weak ? new WeakMap<object, T>() : new Map<string, T>()
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