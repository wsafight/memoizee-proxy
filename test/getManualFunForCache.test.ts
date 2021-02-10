import getManualFunForCache from "../src/getManualFunForCache";

describe('BaseCache tests', () => {
  test('xxxx', () => {
    const sum = (add1: number, add2: number) => {
      return add1 + add2
    }
    const sumManual = getManualFunForCache(sum, new Map)
    expect(sum(1,2)).toBe(3)
    expect(sumManual(1,2)).toBe(3)
  })
})