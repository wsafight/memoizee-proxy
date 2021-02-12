import BaseCacheWithDispose, {defaultDispose} from "../../src/cache/BaseCacheWithDispose";

describe('BaseCacheWithDispose tests', () => {
  test('', () => {
    const cache = new BaseCacheWithDispose()
    expect(cache.cacheMap instanceof Map).toBeTruthy()
  })

  test('', () => {
    const cache = new BaseCacheWithDispose()
    expect(cache.weak).toBeFalsy()
  })

  test('', () => {
    const cache = new BaseCacheWithDispose(undefined)
    expect(cache.cacheMap instanceof Map).toBeTruthy()
  })

  test('', () => {
    const cache = new BaseCacheWithDispose(false)
    expect(cache.cacheMap instanceof Map).toBeTruthy()
  })

  test('', () => {
    const cache = new BaseCacheWithDispose(true)
    expect(cache.cacheMap instanceof WeakMap).toBeTruthy()
  })

  test('', () => {
    const cache = new BaseCacheWithDispose(true)
    expect(cache.disposeAllValue(new Map())).toBe(void 0)
  })


  test('', () => {
    const cache = new BaseCacheWithDispose(true)
    expect(cache.dispose(new Map())).toBe(void 0)
  })


  test('', () => {
    expect(defaultDispose('ddd')).toBe(void 0)
  })


})