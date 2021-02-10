import {generateKey} from "../../src/utils/generateKey";

test('generateKey from arguments', () => {
  function bb() {
    expect(generateKey(arguments as any)).toBe('1,2,sale,4')
  }
  // @ts-ignore
  bb( 1,2,'sale',4)
});

test('generateKey from arguments', () => {
  try {
    generateKey(undefined as any)
  }catch (e) {
    expect(e.message).toEqual("Can't generate key from function argument")
  }
});
