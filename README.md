# memoizee-proxy

Read this in other languages: [简体中文](https://github.com/wsafight/memoizee-proxy/blob/main/README.zh-CN.md)

Memoize based on Proxy.

## features

- Works with any type, any length of function arguments - optional serialization.
- Support for promises and asynchronous functions.
- Configurable weak provides a WeakMap (friendly garbage collection).

## API

| Property | Description | Type | Default |
| :----| :---- | :---- | :---- |
| normalizer | Generates a unique value based on the current parameter | (args: any[]) => string | Array.from(argument).join(',') |
| weak | Using WeakMap  | boolean | false |
| timeout | Timeout duration, expired delete | number | undefined |

## Installation

```bash
npm install memoizee-proxy
```
or

```bash
yarn add memoizee-proxy
```


## Changelog

### 0.0.1
- Basically available, add parameters "normalizer"、 "weak" 、"timeout"

