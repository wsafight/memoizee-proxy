import checkOptionsThenThrowError from '../src/checkOptions'

test('not options', () => {
  expect(checkOptionsThenThrowError()).toBe(undefined)
});


test('options is null object', () => {
  expect(checkOptionsThenThrowError({})).toBe(undefined)
});

test('option include refCount', () => {
  try {
    checkOptionsThenThrowError({
      max: 0
    })
  }catch (e) {
    expect(e.message).toBe('The current options "max" must be positive')
  }
})