import BaseCache from "../../src/cache/BaseCache";

describe('BaseCache tests', () => {
  test('setOrRemove baseCache',() => {
    const baseCache = new BaseCache()
    expect(baseCache.weak).toBe(false)
    baseCache.set('a', 1)
    baseCache.set('b', 1)
    expect(baseCache.cacheMap).toEqual(new Map([['a', 1], ['b', 1]]))
    baseCache.clear()
    expect(baseCache.cacheMap).toEqual(new Map())
  })

  test('setOrRemove baseCache',() => {
    const baseCache = new BaseCache(true)
    expect(baseCache.weak).toBe(true)
    baseCache.set({b: 1}, 12)
    baseCache.set({b: 1}, 12)
    expect(baseCache.cacheMap instanceof WeakMap)
      .toBe(true)
    baseCache.clear()
    expect(baseCache.cacheMap).toEqual(new WeakMap())
  })

  test('delete baseCache WeakMap',() => {
    const baseCache = new BaseCache(true)
    expect(baseCache.weak).toBe(true)
    const obj = {}
    baseCache.set(obj, 12)
    expect(baseCache.has(obj)).toBe(true)
    baseCache.delete(obj)
    expect(baseCache.delete(obj)).toBe(false)
    expect(baseCache.cacheMap).toEqual(new WeakMap())
  })
})