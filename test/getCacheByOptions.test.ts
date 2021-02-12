import getCacheByOptions from "../src/getCacheByOptions";
import Cache from "../src/cache/BaseCache";
import RefCache from "../src/cache/RefCache";
import ExpiredLRUCache from "../src/cache/ExpiredLRUCache";

describe('BaseCache tests', () => {

  test('null options', () => {
    expect(getCacheByOptions() instanceof Cache).toBe(true)
  })

  test('options', () => {
    expect(getCacheByOptions({
      weak: true
    }) instanceof Cache).toBe(true)
  })

  test('options', () => {
    expect(getCacheByOptions({
      refCounter: true
    }) instanceof RefCache).toBe(true)
  })

  test('options', () => {
    expect(getCacheByOptions({
      refCounter: true,
      max: 2,
      maxAge: 3
    }) instanceof ExpiredLRUCache).toBe(true)
  })

  test('options', () => {
    expect(getCacheByOptions({
      maxAge: 3
    }) instanceof ExpiredLRUCache).toBe(true)
  })

  test('options', () => {
    expect(getCacheByOptions({
      max: 2
    }) instanceof ExpiredLRUCache).toBe(true)
  })

})