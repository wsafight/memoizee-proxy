import BaseCache from "../../src/cache/BaseCache";

describe('BaseCache tests', () => {
  test('', () => {
    const cache = new BaseCache()
    expect(cache.cacheMap instanceof Map).toBeTruthy()
  })

  test('', () => {
    const cache = new BaseCache()
    expect(cache.weak).toBeFalsy()
  })

  test('', () => {
    const cache = new BaseCache(undefined)
    expect(cache.cacheMap instanceof Map).toBeTruthy()
  })

  test('', () => {
    const cache = new BaseCache(false)
    expect(cache.cacheMap instanceof Map).toBeTruthy()
  })

  test('', () => {
    const cache = new BaseCache(true)
    expect(cache.cacheMap instanceof WeakMap).toBeTruthy()
  })
})