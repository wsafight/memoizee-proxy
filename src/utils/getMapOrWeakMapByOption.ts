export default function getMapOrWeakMapByOption<V>(weak?: boolean):
  Map<string, V> | WeakMap<object, V> {
  return weak ? new WeakMap<object, V>() : new Map<string, V>()
}