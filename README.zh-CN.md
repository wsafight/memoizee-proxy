# memoizee-proxy

基于 Proxy 的备忘录

## 特性

- [x] 适用于任何类型，任意长度的函数参数 – 可选序列化。
- [x] 支持 Promise 和异步函数。
- [x] 可配置 weak 提供 WeakMap(友好的垃圾回收)。
- [x] 可以手动管理缓存。
- [x] 使用 LRU 进行缓存限制。
- [x] 可选的引用计数器模式，允许更复杂的缓存管理。
- [x] 单元测试。

## 安装

```bash
npm install memoizee-proxy
```

或者

```bash
yarn add memoizee-proxy
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| normalizer | 基于当前参数生成唯一值 | (args: any[]) => string | Array.from(argument).join(',') |
| weak | 是否使用 WeakMap  | boolean | false |
| maxAge | 超时时长，过时删除 | number | undefined |
| max | 存储的最大项目数  | number | undefined |
| manual | 启用手动管理  | boolean | false |
| refCounter | 启动引用计数 | boolean | false |
| dispose | 在从缓存中去除之前的回调函数 | (value: T) => void | undefined |


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

### 0.0.4
- 修复 cacheRef clear 方法缺少 cacheRef 清理。
- 删除 “max” 和 “maxAge” 不能同时存在。


### 0.0.3
- 修复配置 max,如果添加的值大于等于 max 将会报错

### 0.0.2
- 基本完成，添加了 max， maxAge 提供数据管理。
- 添加了 manual，可以手动控制缓存。
- 添加了引用计数缓存。
- 添加 dispose 函数，可以在删除数据时调用控制 value。
- 添加单元测试。

### 0.0.1
- 基本可用，添加了 "normalizer"， "weak"， "timeout" 参数
