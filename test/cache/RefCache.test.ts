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
    expect(cacheWeakMap.has('bb')).toBeFalsy()
  });

  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    const q = {}
    cacheWeakMap.set(q, 'gg')
    cacheWeakMap.deleteRef(q)
    expect(cacheWeakMap.has(q)).toBeFalsy()
  });

  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    const q = {}
    cacheWeakMap.set(q, 'gg')
    cacheWeakMap.deleteRef(q)
    expect(cacheWeakMap.has(q)).toBeFalsy()
  });

  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    const q = {}
    cacheWeakMap.set(q, 'gg')
    cacheWeakMap.clear()
    expect(cacheWeakMap.has(q)).toBeFalsy()
  });

  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    const b = {}
    cacheWeakMap.deleteRef(b)
    expect(cacheWeakMap.has(b)).toBeFalsy()
  });


  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    const b = {}
    cacheWeakMap.deleteRef(b)
    expect(cacheWeakMap.getRefCount(b)).toBe(0)
  });


  test('ref construct3', () => {
    const cacheWeakMap = new RefCache(true)
    const b = {}
    cacheWeakMap.set(b, 'gggg')
    cacheWeakMap.addRef(b)
    cacheWeakMap.addRef(b)
    cacheWeakMap.deleteRef(b)
    cacheWeakMap.deleteRef(b)
    cacheWeakMap.deleteRef(b)
    expect(cacheWeakMap.has(b)).toBeFalsy()
  });
})




