export interface CacheMap<K ,V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V, timeout?: number): this;
}

/**
 * 缓存类型
 */
export type MemoizeCache = CacheMap<string | object, any>

export interface MemoizeOptions {
  /** 保证缓存函数参数的唯一性 */
  normalizer?: (args: any[]) => string;
  /** 使用 weakMap */
  weak?: boolean;
  /** 超时后则取数据为空 */
  timeout?: number
}