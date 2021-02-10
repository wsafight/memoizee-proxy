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

  test('Promise', () => {
    const sum = (add1: number, add2: number) => {
      return Promise.resolve(add1 + add2)
    }
    const sumManual = getManualFunForCache(sum, new Map)
    expect(sum(1,2)).toEqual(Promise.resolve(3))
    expect(sumManual(1,2)).toEqual(Promise.resolve(3))
  })

  test('async function', () => {
    let b = 3
    const sum = async (add1: number, add2: number) => {
      return add1 + add2 + b
    }
    const sumManual = getManualFunForCache(sum, new Map)
    expect(sum(1,2)).toEqual(Promise.resolve(6))
    expect(sumManual(1,2)).toEqual(Promise.resolve(6))
  })

  test('class async function', () => {

    class AsyncClass {
      readonly b: number = 3;

      async _sum(a: number, b: number) {
        return a + b + this.b
      }
      sum(a: number, b: number) {
        this._sum(a, b)
        const sumManual = getManualFunForCache(this._sum, new Map)
        expect(this._sum(1,2)).toEqual(Promise.resolve(6))
        expect(sumManual(1,2)).toEqual(Promise.resolve(6))
      }
    }

    const b = new AsyncClass()
    b.sum(1,2)


  })
})