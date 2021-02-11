import BaseCache from "../../src/cache/BaseCache";

describe('BaseCache tests', () => {

  test('set baseCache',() => {
    const baseCache = new BaseCache()
    expect(baseCache.weak).toBe(false)
  })

  test('setOrRemove baseCache',() => {
    const baseCache = new BaseCache()
    baseCache.set('a', 1)
    baseCache.set('b', 1)
    expect(baseCache.cacheMap).toEqual(new Map([['a', 1], ['b', 1]]))
  })

  test('setOrRemove baseCache',() => {
    const baseCache = new BaseCache()
    baseCache.set('a', 1)
    baseCache.set('b', 1)
    baseCache.clear()
    expect(baseCache.cacheMap).toEqual(new Map())
  })


  test('setWeakMap baseCache',() => {
    const baseCache = new BaseCache(true)
    expect(baseCache.weak).toBe(true)
  })

  test('setWeakMap baseCache',() => {
    const baseCache = new BaseCache(true)
    expect(baseCache.cacheMap instanceof WeakMap)
      .toBe(true)
  })

  test('setWeakMap baseCache',() => {
    const baseCache = new BaseCache(true)
    baseCache.set({b: 1}, 12)
    baseCache.set({b: 1}, 12)
    baseCache.clear()
    expect(baseCache.cacheMap).toEqual(new WeakMap())
  })

  test('setWeakMap baseCache',() => {
    const baseCache = new BaseCache(true)
    baseCache.set({b: 1}, 12)
    baseCache.set({b: 1}, 12)
    expect(baseCache.has({b: 1})).toBeFalsy()
  })


  test('setWeakMap baseCache',() => {
    const baseCache = new BaseCache(true)
    const bb = {}
    baseCache.set(bb, 12)
    expect(baseCache.has(bb)).toBeTruthy()
  })
  test('delete baseCache WeakMap',() => {
    const baseCache = new BaseCache(true)
    const obj = {}
    baseCache.set(obj, 12)
    expect(baseCache.delete(obj)).toBe(true)
  })
})