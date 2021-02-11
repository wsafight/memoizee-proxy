import RefCache from "../../src/cache/RefCache";

describe('RefCache tests', () => {
  test('ref construct', () => {
    const cache = new RefCache()
    expect(cache.cacheMap instanceof Map).toBe(true)
  });

  test('ref construct2', () => {
    const cacheMap = new RefCache(false)
    expect(cacheMap.cacheMap instanceof Map).toBe(true)
  });

  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    expect(cacheWeakMap.cacheMap instanceof WeakMap).toBe(true)
  });

  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    expect(cacheWeakMap.cacheMap instanceof WeakMap).toBe(true)
  });

  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    cacheWeakMap.addRef('bb')
    expect(cacheWeakMap.cacheMap instanceof WeakMap).toBe(true)
  });
})




