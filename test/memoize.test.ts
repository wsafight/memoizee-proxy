import {memoizee} from "../src";

function fibonacci(n: number): number {
  return n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)
}

let index: number = 1

function getObjectId(): number {
  return index++
}

function sumPromise(a: number, b: number): Promise<number> {
  if (a == 6) {
    return Promise.reject('error')
  }
  return Promise.resolve(a + b)
}

test('sumPromise', () => {
  const memoizeed = memoizee<any>(sumPromise, {manual: true})
  memoizeed(1, 2)
  expect(memoizeed.get?.('1,2')).toEqual(Promise.resolve(3))
})

test('sumPromise', () => {
  const memoizeed = memoizee<any>(sumPromise)
  try {
    memoizeed(6, 2)
  }catch (e) {
    expect(e.message).toBe('error')
  }

})

test('adds 1 + 2 to equal 3', () => {
  const memoizeed = memoizee<number>(fibonacci)
  const result = memoizeed(30)
  expect(result).toBe(1346269)
});

test('adds 1 + 2 to equal 3', () => {
  const memoizeed = memoizee<number>(fibonacci)
  try {
    console.log(memoizeed.set?.('99', 99))
  } catch (e) {
    expect(e.message).toBe('memoizeed.set is not a function')
  }
});


test('adds 1 + 2 to equal 3', () => {
  const memoizeed = memoizee<number>(fibonacci, {manual: true})
  console.log(memoizeed.set?.('99', 99))
  expect(memoizeed.get?.('99')).toBe(99)
});

test('adds 1 + 2 to equal 3', () => {
  const memoizeed = memoizee<number>(fibonacci, {weak: true, manual: true})
  const bb = {}
  memoizeed.set?.(bb, 99)
  expect(memoizeed.get?.(bb)).toBe(99)
});



test('adds 1 + 2 to equal 3', () => {
  const memoizeed = memoizee<any>(fibonacci, {weak: true, manual: true})
  const bb = {}
  memoizeed.set?.(bb, Promise.resolve('ccc'))
  expect(memoizeed.get?.(bb)).toEqual(Promise.resolve('ccc'))
});


test('adds 1 + 2 to equal 3', () => {
  const memoizeed = memoizee<any>(getObjectId, {refCounter: true, manual: true})
  const bb = {}
  expect(memoizeed(bb)).toEqual(1)
});


test('adds 1 + 2 to equal 3', () => {
  const fibonacci = (n: number): number => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
  const memoizeedFibonacci = memoizee<number>(fibonacci, {manual: true, max: 3});
  expect(memoizeedFibonacci(3)).toEqual(3)
  expect(memoizeedFibonacci(4)).toEqual(5)
  expect(memoizeedFibonacci(5)).toEqual(8)
});



test('adds 1 + 2 to equal 3', () => {
  const memoizeed = memoizee<number>(fibonacci, {weak: true, manual: true, closeable: true})
  const bb = {}
  memoizeed.set?.(bb, 99)
  expect(memoizeed.get?.(bb)).toBe(99)
  memoizeed.handleCacheClose()
  expect(memoizeed.get?.(bb)).toBe(undefined)


  memoizeed.set?.(bb, 99)
  memoizeed.handleCacheOpen()
  expect(memoizeed.get?.(bb)).toBe(99)
});
