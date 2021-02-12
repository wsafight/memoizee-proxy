import { CacheMap, MemoizeCache } from "./interface";

/**
 * Get the function that can manage the cache manually
 * @param cache
 */
export default function getManualActionObjFormCache<V>(
  cache: MemoizeCache<V>
): CacheMap<string | object, V> {
  const manualTarget = Object.create(null)
  manualTarget.set = (key: string | object, val: V) => cache.set(key, val)
  manualTarget.get = (key: string | object) => cache.get(key)
  manualTarget.delete = (key: string | object) => cache.delete(key)
  manualTarget.clear = () => cache.clear!()
  if (cache.addRef) {
    manualTarget.addRef = (key: string | object) => cache.addRef!(key)
  }
  if (cache.deleteRef) {
    manualTarget.deleteRef = (key: string | object) => cache.deleteRef!(key)
  }
  return manualTarget
}