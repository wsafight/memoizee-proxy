import getManualActionObjFormCache from '../src/getManualActionObjFormCache'
import RefCache from "../src/cache/RefCache";

describe('getManualActionObjFormCache tests', () => {

  test('', () => {
    const result = getManualActionObjFormCache(new Map())
    expect(result instanceof Map).toBe(false)
  })

  test('', () => {
    const result = getManualActionObjFormCache(new Map())
    result.set('bb', 'dd')
    expect(result.get('bb')).toBe('dd')
  })

  test('', () => {
    const result = getManualActionObjFormCache(new Map())
    result.set('bb', 'dd')
    expect(result.get('bb')).toBe('dd')
  })

  test('', () => {
    const result = getManualActionObjFormCache(new Map())
    result.set('bb', 'dd')
    result.delete('bb')
    expect(result.get('bb')).toBe(undefined)
  })

  test('', () => {
    const result = getManualActionObjFormCache<any>(new RefCache())
    result.set('bb', 'dd')
    result.clear()
    expect(result.get('bb')).toBe(undefined)
  })

  test('', () => {
    const result = getManualActionObjFormCache<any>(new RefCache())
    result.set('bb', 'dd')
    result.set('bb', 'gg')
    result.deleteRef!('bb')
    expect(result.get('bb')).toBe('gg')
    result.deleteRef!('bb')
    expect(result.get('bb')).toBe(undefined)
  })

  test('', () => {
    const result = getManualActionObjFormCache<any>(new RefCache())
    result.set('bb', 'dd')
    result.addRef!('bb')
    result.deleteRef!('bb')
    expect(result.get('bb')).toBe('dd')
    result.deleteRef!('bb')
    expect(result.get('bb')).toBe(undefined)
  })
})