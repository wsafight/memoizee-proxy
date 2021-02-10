import {invariant} from "../../src/utils/inveriant";

test('invariant', () => {
  expect(invariant(false, 'error')).toBe(undefined)
})

test('invariantThrowError', () => {
  try {
    invariant(true, 'error')
  }catch (e) {
    expect(e.message).toEqual('error')
  }
});
