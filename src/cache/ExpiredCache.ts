import { CacheMap, MemoizeCache } from '../interface'
import ExpiredCacheItem from "./ExpiredCacheItem";


export default class ExpiredCache<V> implements CacheMap<string | object, V> {
  // Define static data map as cache pool
  cacheMap: MemoizeCache

  timeout: number

  constructor(cacheMap: MemoizeCache, timeout: number, ) {
    this.cacheMap = cacheMap
    this.timeout = timeout
  }

  isOverTime(name: string) {
    const data = this.cacheMap.get(name)

    // No data must time out,  The current value is ItemCache
    if (!data) return true

    // Get the current time stamp of the system
    const currentTime = (new Date()).getTime()

    // Gets the number of millimeters in the past between the current time and the storage time
    const overTime = currentTime - data.cacheTime

    // If the number of seconds in the past is greater than the current timeout, null is also returned to the server to fetch data

    if (Math.abs(overTime) > this.timeout) {
      this.cacheMap.delete(name)
      return true
    }

    return false
  }

  has(name: string) {
    return !this.isOverTime(name)
  }

  delete(name: string) {
    return this.cacheMap.delete(name)
  }

  get(name: string) {
    // If the data times out, null is returned, but there is no time out, and the data is returned instead of the ItemCache object
    return this.isOverTime(name) ? null : this.cacheMap.get(name).data
  }

  set(name: string | object, data: V) {
    const itemCache = new ExpiredCacheItem<V>(data)
    this.cacheMap.set(name, itemCache)
    return this
  }
}