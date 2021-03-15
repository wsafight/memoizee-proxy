export type TargetFun<V> = (...args: any[]) => V

export type DisposeFun<V> = (value: V) => void

export interface BaseCacheMap<K, V> {
  delete(key: K): boolean;

  get(key: K): V | undefined;

  has(key: K): boolean;

  set(key: K, value: V): this;

  clear?(): void;

  addRef?(key: K): void;

  deleteRef?(key: K): boolean;
}

export interface CacheMap<K, V> extends BaseCacheMap<K, V> {
  clear(): void;
}

export type MemoizeCache<V> = BaseCacheMap<string | object, V>

export interface MemoizeOptions<V> {
  /** Generates a unique value based on the current parameter */
  normalizer?: (args: any[]) => string;
  /** using weakMap */
  weak?: boolean;
  /** use LFU cache */
  LFU?: boolean;
  /** Timeout duration, expired delete */
  maxAge?: number;
  /** How much data can be saved at most? Use LRU  */
  max?: number;
  /** manage the cache manually */
  manual?: boolean;
  /** Reference count  */
  refCounter?: boolean;
  /** Called right before an item is evicted from the cache */
  dispose?: DisposeFun<V>;
  /** Provide shutdown cache */
  closeable?: boolean
}

export interface ResultFun<V> extends Function {
  delete?(key: string | object): boolean;

  get?(key: string | object): V | undefined;

  has?(key: string | object): boolean;

  set?(key: string | object, value: V): this;

  clear?(): void;

  addRef?(): void;

  deleteRef?(): void

  handleCacheClose?(): void
}
