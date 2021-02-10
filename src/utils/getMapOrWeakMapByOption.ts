export default function getMapOrWeakMapByOption(weak?: boolean) {
  return weak ? new WeakMap() : new Map()
}