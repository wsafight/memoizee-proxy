import memoize from "../src";

function fibonacci (n: number): number {
  return n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)
}

test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<number>(fibonacci)
  const result = memoized(30)
  expect(result).toBe(1346269)
});

test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<number>(fibonacci)
  try {
    console.log(memoized.set('99', 99))
  }catch (e) {
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