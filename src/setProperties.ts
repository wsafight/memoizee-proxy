import { MemoizeCache } from "./interface";

export default function setPropertiesForCache<T>(obj: (...args: any[]) => T, cache: MemoizeCache) {
  Object.defineProperties(obj, {
    set: {
      value: (key: string | object, val: T) => cache.set(key, val),
      writable: false
    },
    delete: {
      value: (key: string | object) => cache.delete(key),
      writable: false
    },
    ...cache.deleteRef && {
      deleteRef: {
        value: (key: string | object) => cache.deleteRef!(key),
        writable: false
      }
    }
  })
}