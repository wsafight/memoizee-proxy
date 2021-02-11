import ExpiredLRUCache from "../../src/cache/ExpiredLRUCache";


test('delete baseCache WeakMap',() => {
  const cache = new ExpiredLRUCache()
  cache.set('bb', 'cc')
  expect(cache.get('bb')).toBe('cc')
})
