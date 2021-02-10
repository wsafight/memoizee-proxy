import ExpiredCacheItem from "../../src/cache/ExpiredCacheItem";


test('new ExpiredCacheItem', () => {
  const cacheItem = new ExpiredCacheItem('e')
  expect(cacheItem.cacheTime).toBe((new Date()).getTime())
  expect(cacheItem.data).toBe('e')
});
