import ExpiredCacheItem from "./ExpiredCacheItem";
import { CacheMap, MemoizeCache } from "../interface";

interface QuickLRUOptions {
  max?: number;
  maxAge?: number;
  weak?: boolean;
}

export default class ExpiredLRUCache<V> implements CacheMap<string | object, V> {
  max: number
  maxAge: number
  private size: number = 0

  cache: MemoizeCache<ExpiredCacheItem<V>>;

  oldCache: MemoizeCache<ExpiredCacheItem<V>>;

  weak: boolean = false

  constructor(options?: QuickLRUOptions) {

    this.max = options?.max || Number.POSITIVE_INFINITY;

    if (typeof options?.maxAge === 'number' && options.maxAge > 0) {
      this.maxAge = options?.maxAge
    }
    this.weak = options?.weak ?? false

    this.cache = this.getMemoizeCacheByWeak()
    this.cache = this.getMemoizeCacheByWeak()
  }

  private getMemoizeCacheByWeak(): MemoizeCache<ExpiredCacheItem<V>> {
    return this.weak ? new WeakMap() : new Map()
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

  _getOrDeleteIfExpired(key: string | object, item: ExpiredCacheItem<V>): V | undefined {
    const deleted = this.deleteIfExpired(key, item);
    if (!deleted) {
      return item.data;
    }
    return
  }

  _getItemValue(key: string | object, item: ExpiredCacheItem<V>): V | undefined {
    return this.maxAge ? this._getOrDeleteIfExpired(key, item) : item.data;
  }

  _set(key: string | object, value: ExpiredCacheItem<V>) {
    this.cache.set(key, value);
    this.size++;

    if (this.size >= this.max) {
      this.size = 0;
      // this._emitEvictions(this.oldCache);
      this.oldCache = this.cache;
      this.cache = this.getMemoizeCacheByWeak()
    }
  }

  _moveToRecent(key: string | object, item: ExpiredCacheItem<V>) {
    this.oldCache.delete(key);
    this._set(key, item);
  }

  get(key: string | object): V | undefined {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);
      return this._getItemValue(key, item!);
    }

    if (this.oldCache.has(key)) {
      const item = this.oldCache.get(key);
      if (!this.deleteIfExpired(key, item!)) {
        this._moveToRecent(key, item!);
        return item!.data;
      }
    }
    return
  }

  set(key: string | object, value: V) {
    const itemCache = new ExpiredCacheItem<V>(value)
    this.cache.has(key) ? this.cache.set(key, itemCache) : this._set(key, itemCache);
    return this
  }

  has(key: string | object) {
    if (this.cache.has(key)) {
      return !this.deleteIfExpired(key, this.cache.get(key)!);
    }

    if (this.oldCache.has(key)) {
      return !this.deleteIfExpired(key, this.oldCache.get(key)!);
    }

    return false;
  }

  delete(key: string | object): boolean {
    const deleted = this.cache.delete(key);

    if (deleted) {
      this.size--;
    }

    return this.oldCache.delete(key) || deleted;
  }

  clear() {
    this.size = 0;

    this.cache.clear?.();
    this.oldCache.clear?.();
  }
}