import BaseCacheWithDispose from "./BaseCacheWithDispose";
import { CacheMap, DisposeFun } from "../interface";

export interface QuickLFUOptions<V> {
  capacity?: number;
  maxAge?: number;
  dispose?: DisposeFun<V>
}

export default class ExpiredLFUCache<V> extends BaseCacheWithDispose<V, V> implements CacheMap<string | object, V> {

  public size: number;

  public timesMap: Map<string, number>;

  constructor(options?: QuickLFUOptions<V>) {
    super(false, options?.dispose)
    this.size = options?.capacity || 20
    this.timesMap = new Map<string, number>()
  }


  delete(key: string): boolean {
    if (this.cacheMap.has(key)) {
      this.disposeValue(this.cacheMap.get(key))
      this.cacheMap.delete(key)
      this.timesMap.delete(key)
      return true
    }
    return false;
  }

  get(key: string): V | undefined {
    if (this.cacheMap.has(key)) {
      const val = this.cacheMap.get(key)
      const time: number = this.timesMap.get(key) || 0
      this.timesMap.set(key, time + 1)
      return val
    }
    return undefined
  }

  set(key: string, value: V): this {
    let time: number = 1
    const values = Array.from(this.timesMap.values())
    let min: number = Math.min(...values)  // 获取之前使用次数最少的

    const cacheMap: Map<string, V> = this.cacheMap as Map<string, V>
    if (cacheMap.has(key)) {
      time = (this.timesMap.get(key) || 0) + 1
    }
    cacheMap.set(key, value)
    this.timesMap.set(key, time)
    // 新增才会发生长度变化, 设置不会, 所以只要删除之前最不常用的元素, 当前加入的不用删
    if (this.size < cacheMap.size) {
      const it = cacheMap.keys()
      let delKey = it.next().value
      while (delKey && this.timesMap.get(delKey) !== min) {  // 找到最小那个key
        delKey = it.next().value
      }
      this.disposeValue(cacheMap.get(delKey))
      cacheMap.delete(delKey)
      this.timesMap.delete(delKey)
    }
    return this
  }

  clear() {
    this.disposeAllValue(this.cacheMap)
    this.cacheMap.clear!()
    this.timesMap.clear()
  }
}