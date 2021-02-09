import memoize from "../../src";

function fibonacci (n: number): number {
  return n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)
}

test('adds 1 + 2 to equal 3', () => {
  const memoized = memoize<number>(fibonacci)
  const result = memoized(30)
  expect(result).toBe(1346269)
});
