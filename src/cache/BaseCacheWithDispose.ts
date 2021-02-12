import { DisposeFun, MemoizeCache } from "../interface";
import BaseCache from "./BaseCache";

export const defaultDispose: DisposeFun<any> = () => void 0

export default class BaseCacheWithDispose<V, WrapperV> extends BaseCache<WrapperV> {
  readonly weak: boolean
  readonly dispose: DisposeFun<V>

  constructor(weak: boolean = false, dispose: DisposeFun<V> = defaultDispose) {
    super(weak)
    this.weak = weak
    this.dispose = dispose
  }


  disposeValue(value: V | undefined): void {
    if (value) {
      this.dispose(value)
    }
  }

  disposeAllValue<V>(cacheMap: MemoizeCache<V>): void {
    for (let mapValue of (cacheMap as any)) {
      this.disposeValue(mapValue?.[1])
    }
  }
}