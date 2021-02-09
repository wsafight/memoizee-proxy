import ExpiredCacheItem from "./ExpiredCacheItem";

interface QuickLRUOptions {
  max?: number;
  maxAge?: number;
}

export default class QuickLRU<V> {
  max: number
  maxAge: number
  private size: number = 0
  cache: any;
  oldCache: any
  constructor(options?: QuickLRUOptions) {

    this.max = options?.max || Number.POSITIVE_INFINITY;

    if (typeof options?.maxAge === 'number' && options.maxAge > 0) {
      this.maxAge = options?.maxAge
    }
    // this.onEviction = options.onEviction;
    this.cache = new Map();
    this.oldCache = new Map();
  }

  // TODO: Use private class methods when targeting Node.js 16.
  // _emitEvictions(cache) {
  //   if (typeof this.onEviction !== 'function') {
  //     return;
  //   }
  //
  //   for (const [key, item] of cache) {
  //     this.onEviction(key, item.value);
  //   }
  // }

  isOverTime(item: ExpiredCacheItem<V>) {

    // Get the current time stamp of the system
    const currentTime = (new Date()).getTime()

    // Gets the number of millimeters in the past between the current time and the storage time
    const overTime = currentTime - item.cacheTime

    return Math.abs(overTime) > this.maxAge
    // If the number of seconds in the past is greater than the current timeout, null is also returned to the server to fetch data
  }

  _deleteIfExpired(key: string | object, item: ExpiredCacheItem<V>) {
    if (this.isOverTime(item)) {
      // if (typeof this.onEviction === 'function') {
      //   this.onEviction(key, item.value);
      // }

      return this.delete(key);
    }
    return false;
  }

  _getOrDeleteIfExpired(key: string | object, item: ExpiredCacheItem<V>): V | undefined {
    const deleted = this._deleteIfExpired(key, item);
    if (deleted === false) {
      return item.data;
    }
    return
  }

  _getItemValue(key: string | object, item: ExpiredCacheItem<V>) {
    return this.maxAge ? this._getOrDeleteIfExpired(key, item) : item.data;
  }

  _peek(key: string | object, cache: any) {
    const item = cache.get(key);

    return this._getItemValue(key, item);
  }

  _set(key: string | object, value: ExpiredCacheItem<V>) {
    this.cache.set(key, value);
    this.size++;

    if (this.size >= this.max) {
      this.size = 0;
      // this._emitEvictions(this.oldCache);
      this.oldCache = this.cache;
      this.cache = new Map();
    }
  }

  _moveToRecent(key: string | object, item: ExpiredCacheItem<V>) {
    this.oldCache.delete(key);
    this._set(key, item);
  }

  get(key: string|object): V | undefined {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);

      return this._getItemValue(key, item);
    }

    if (this.oldCache.has(key)) {
      const item = this.oldCache.get(key);
      if (this._deleteIfExpired(key, item) === false) {
        this._moveToRecent(key, item);
        return item.data;
      }
    }
    return
  }

  set(key: string | object, value: V) {
    const itemCache = new ExpiredCacheItem<V>(value)
    if (this.cache.has(key)) {
      this.cache.set(key, itemCache);
    } else {
      this._set(key, itemCache);
    }
  }

  has(key: string | object) {
    if (this.cache.has(key)) {
      return !this._deleteIfExpired(key, this.cache.get(key));
    }

    if (this.oldCache.has(key)) {
      return !this._deleteIfExpired(key, this.oldCache.get(key));
    }

    return false;
  }

  delete(key: string | object) {
    const deleted = this.cache.delete(key);

    if (deleted) {
      this.size--;
    }

    return this.oldCache.delete(key) || deleted;
  }

  clear() {
    this.cache.clear();
    this.oldCache.clear();
    this.size = 0;
  }
}