import ExpiredCacheItem from "./ExpiredCacheItem";
import {CacheMap, DisposeFun, MemoizeCache} from "../interface";
import BaseCacheWithDispose from "./BaseCacheWithDispose";

interface QuickLRUOptions<V> {
  max?: number;
  maxAge?: number;
  weak?: boolean;
  dispose?: DisposeFun<V>
}


export default class ExpiredLRUCache<V> extends BaseCacheWithDispose<V, ExpiredCacheItem<V>> implements CacheMap<string | object, V> {
  readonly max: number
  readonly maxAge: number = Infinity
  private size: number = 0

  oldCacheMap: MemoizeCache<ExpiredCacheItem<V>>;

  constructor(options?: QuickLRUOptions<V>) {
    super(options?.weak, options?.dispose)
    this.max = options?.max || Number.POSITIVE_INFINITY;

    if (typeof options?.maxAge === 'number' && options.maxAge > 0) {
      this.maxAge = options?.maxAge
    }
    this.oldCacheMap = this.getMapOrWeakMapByOption()
  }


  private isOverTime(item: ExpiredCacheItem<V>) {

    // Get the current time stamp of the system
    const currentTime = (new Date()).getTime()

    // Gets the number of millimeters in the past between the current time and the storage time
    const overTime = currentTime - item.cacheTime

    return Math.abs(overTime) > this.maxAge
    // If the number of seconds in the past is greater than the current timeout, null is also returned to the server to fetch data
  }

  private deleteIfExpired(key: string | object, item: ExpiredCacheItem<V>) {
    if (this.isOverTime(item)) {
      return this.delete(key);
    }
    return false;
  }

  private getOrDeleteIfExpired(key: string | object, item: ExpiredCacheItem<V>): V | undefined {
    const deleted = this.deleteIfExpired(key, item);
    return !deleted ? item.data : undefined;
  }

  private getItemValue(key: string | object, item: ExpiredCacheItem<V>): V | undefined {
    return this.maxAge ? this.getOrDeleteIfExpired(key, item) : item?.data;
  }

  private _set(key: string | object, value: ExpiredCacheItem<V>) {
    this.cacheMap.set(key, value);
    this.size++;

    if (this.size >= this.max) {
      this.size = 0;
      // this._emitEvictions(this.oldCache);
      this.oldCacheMap = this.cacheMap;
      this.cacheMap = this.getMapOrWeakMapByOption()
    }
  }

  private moveToRecent(key: string | object, item: ExpiredCacheItem<V>) {
    this.oldCacheMap.delete(key);
    this._set(key, item);
  }

  get(key: string | object): V | undefined {
    if (this.cacheMap.has(key)) {
      const item = this.cacheMap.get(key);
      return this.getItemValue(key, item!);
    }

    if (this.oldCacheMap.has(key)) {
      const item = this.oldCacheMap.get(key);
      if (!this.deleteIfExpired(key, item!)) {
        this.moveToRecent(key, item!);
        return item!.data as V;
      }
    }
    return undefined
  }

  set(key: string | object, value: V) {
    const itemCache = new ExpiredCacheItem<V>(value)
    this.cacheMap.has(key) ? this.cacheMap.set(key, itemCache) : this._set(key, itemCache);
    return this
  }

  has(key: string | object) {
    if (this.cacheMap.has(key)) {
      return !this.deleteIfExpired(key, this.cacheMap.get(key)!);
    }

    if (this.oldCacheMap.has(key)) {
      return !this.deleteIfExpired(key, this.oldCacheMap.get(key)!);
    }

    return false;
  }

  delete(key: string | object): boolean {
    const value = this.cacheMap.get(key)
    this.disposeValue(value?.data)
    const oldValue = this.oldCacheMap.get(key)
    this.disposeValue(oldValue?.data)

    const deleted = this.cacheMap.delete(key);

    if (deleted) {
      this.size--;
    }

    return this.oldCacheMap.delete(key) || deleted;
  }

  disposeAllValue(cacheMap: MemoizeCache<any>) {
    for (let mapValue of (cacheMap as any)) {
      this.disposeValue(mapValue?.[1]?.data)
    }
  }

  clear() {
    this.size = 0;
    if (this.weak) {
      this.cacheMap = this.getMapOrWeakMapByOption()
      this.oldCacheMap = this.getMapOrWeakMapByOption()
    } else {
      this.disposeAllValue(this.cacheMap)
      this.disposeAllValue(this.oldCacheMap)
      this.cacheMap.clear?.();
      this.oldCacheMap.clear?.();
    }
  }
}