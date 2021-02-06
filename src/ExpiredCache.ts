import { CacheMap, MemoizeCache } from './interface'

class ItemCache<V> {
  cacheTime: number;
  data: V;

  constructor(data: V) {
    this.data = data
    // 创建对象时候的时间，大约设定为数据获得的时间
    this.cacheTime = (new Date()).getTime()
  }
}

export default class ExpiredCache<V> implements CacheMap<string | object, V> {
  // 定义静态数据map来作为缓存池
  cacheMap: MemoizeCache
  // 超时时间
  timeout: number

  constructor(cacheMap: MemoizeCache, timeout: number, ) {
    this.cacheMap = cacheMap
    this.timeout = timeout
  }

  // 数据是否超时
  isOverTime(name) {
    const data = this.cacheMap.get(name)

    // 没有数据 一定超时
    if (!data) return true

    // 获取系统当前时间戳
    const currentTime = (new Date()).getTime()

    // 获取当前时间与存储时间的过去的秒数
    const overTime = currentTime - data.cacheTime

    // 如果过去的秒数大于当前的超时时间，也返回null让其去服务端取数据
    if (Math.abs(overTime) > this.timeout) {
      // 此代码可以没有，不会出现问题，但是如果有此代码，再次进入该方法就可以减少判断。
      this.cacheMap.delete(name)
      return true
    }

    // 不超时
    return false
  }

  // 当前data在 cache 中是否超时
  has(name) {
    return !this.isOverTime(name)
  }

  // 删除 cache 中的 data
  delete(name) {
    return this.cacheMap.delete(name)
  }

  // 获取
  get(name) {
    const isDataOverTiem = this.isOverTime(name)
    //如果 数据超时，返回null，但是没有超时，返回数据，而不是 ItemCache 对象
    return isDataOverTiem ? null : this.cacheMap.get(name).data
  }

  // 默认存储20分钟
  set(name: string | object, data: V) {
    // 设置 itemCache
    const itemCache = new ItemCache<V>(data)
    //缓存
    this.cacheMap.set(name, itemCache)
    return this
  }
}