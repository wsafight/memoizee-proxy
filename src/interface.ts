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
  /** Generates a unique value based on the current parameter */
  normalizer?: (args: any[]) => string;
  /** using weakMap */
  weak?: boolean;
  /** Timeout duration, expired delete */
  timeout?: number;
  /**  */
  refCounter?: boolean
}