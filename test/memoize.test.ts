import memoize from "../src";

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
  const memoized = memoize<any>(sumPromise, {manual: true})
  memoized(1, 2)
  expect(memoized.get('1,2')).toEqual(Promise.resolve(3))
})

test('sumPromise', () => {
  const memoized = memoize<any>(sumPromise)
  try {
    memoized(6, 2)
  }catch (e) {
    expect(e.message).toBe('error')
  }

})

test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<number>(fibonacci)
  const result = memoized(30)
  expect(result).toBe(1346269)
});

test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<number>(fibonacci)
  try {
    console.log(memoized.set('99', 99))
  } catch (e) {
    expect(e.message).toBe('memoized.set is not a function')
  }
});


test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<number>(fibonacci, {manual: true})
  console.log(memoized.set('99', 99))
  expect(memoized.get('99')).toBe(99)
});

test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<number>(fibonacci, {weak: true, manual: true})
  const bb = {}
  memoized.set(bb, 99)
  expect(memoized.get(bb)).toBe(99)
});

test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<any>(fibonacci, {weak: true, manual: true})
  const bb = {}
  memoized.set(bb, Promise.resolve('ccc'))
  expect(memoized.get(bb)).toEqual(Promise.resolve('ccc'))
});


test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<any>(getObjectId, {refCounter: true, manual: true})
  const bb = {}
  expect(memoized(bb)).toEqual(1)
});


test('adds 1 + 2 to equal 3', () => {
  const fibonacci = (n: number): number => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
  const memoizedFibonacci = memoize<number>(fibonacci, {manual: true, max: 3});
  expect(memoizedFibonacci(3)).toEqual(3)
  expect(memoizedFibonacci(4)).toEqual(5)
  expect(memoizedFibonacci(5)).toEqual(8)
});

