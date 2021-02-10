import getMapOrWeakMapByOption from "../../src/utils/getMapOrWeakMapByOption";

test('getMapOrWeakMapByOption null', () => {
  const result = getMapOrWeakMapByOption()
  expect(result instanceof Map).toBe(true)
});

test('getMapOrWeakMapByOption true', () => {
  const result = getMapOrWeakMapByOption(true)
  expect(result instanceof WeakMap).toBe(true)
});

test('getMapOrWeakMapByOption false', () => {
  const result = getMapOrWeakMapByOption(false)
  expect(result instanceof Map).toBe(true)
});