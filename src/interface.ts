export interface CacheMap<K ,V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V, timeout?: number): this;
  addRef?(key: K): void;
  deleteRef?(key: K): boolean;
}

export type MemoizeCache = CacheMap<string | object, any>

export interface MemoizeOptions {
  /** Generates a unique value based on the current parameter */
  normalizer?: (args: any[]) => string;
  /** using weakMap */
  weak?: boolean;
  /** Timeout duration, expired delete */
  maxAge?: number;
  /** How much data can be saved at most? Use LRU  */
  max?: number;
  /** manage the cache manually */
  manual?: boolean;
  /** Reference count  */
  refCounter?: boolean;
}