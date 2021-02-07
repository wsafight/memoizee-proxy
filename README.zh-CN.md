# memoizee-proxy

基于 Proxy 的备忘录

## 特性

- [x] 适用于任何类型，任意长度的函数参数 – 可选序列化。
- [x] 支持 Promise 和异步函数。
- [x] 可配置 weak 提供 WeakMap(友好的垃圾回收)。
- [ ] 可以手动清除缓存。
- [ ] 使用 LRU 进行缓存限制。
- [ ] 可选的引用计数器模式，允许更复杂的缓存管理。
- [ ] 单元测试。

## 安装

```bash
npm install react-time-range-selector
```

或者

```bash
yarn add react-time-range-selector
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| normalizer | 基于当前参数生成唯一值 | (args: any[]) => string | Array.from(argument).join(',') |
| weak | 是否使用 WeakMap  | boolean | false |
| timeout | 超时时长，过时删除 | number | undefined |

## 用法

```ts
import memoizee from 'memoizee-proxy'

var fn = function(one, two, three) {
	/* ... */
};

memoized = memoize(fn);

memoized("foo", 3, "bar");
memoized("foo", 3, "bar"); // Cache hit
```

```ts
var afn = function(a, b) {
	return new Promise(function(res) {
		res(a + b);
	});
};
memoized = memoize(afn, { promise: true });

memoized(3, 7);
memoized(3, 7); // Cache hit
```




## Changelog

### 0.0.1
- 基本可用，添加了 "normalizer"， "weak"， "timeout" 参数
