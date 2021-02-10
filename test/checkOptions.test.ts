import checkOptionsThenThrowError from '../src/checkOptions'

test('not options', () => {
  expect(checkOptionsThenThrowError()).toBe(undefined)
});