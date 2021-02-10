import getCacheByOptions from "../src/getCacheByOptions";
import BaseCache from "../src/cache/BaseCache";

describe('BaseCache tests', () => {

  test('null options', () => {
    expect(getCacheByOptions() instanceof BaseCache).toBe(true)
  })

})