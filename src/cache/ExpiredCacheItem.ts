/**
 * Saves the cache entry for the current time
 */
export default class ExpiredCacheItem<V> {
  data: V;
  cacheTime: number;

  constructor(data: V) {
    this.data = data
    // The time when the object is created is set to the time when the data is obtained
    this.cacheTime = (new Date()).getTime()
  }
}