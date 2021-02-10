import RefCache from "../../src/cache/RefCache";

describe('RefCache tests', () => {
  test('ref construct', () => {
    const cache = new RefCache()
    expect(cache.cacheMap instanceof Map).toBe(true)
    const cacheMap = new RefCache(false)
    expect(cacheMap.cacheMap instanceof Map).toBe(true)
    const cacheWeakMap = new RefCache(true)
    expect(cacheWeakMap.cacheMap instanceof WeakMap).toBe(true)

  });
})




