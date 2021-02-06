# memoizee-proxy

Read this in other languages: [简体中文](https://github.com/LazierGame/react-time-range-selector/blob/main/README.zh-CN.md)


Memoize based on Proxy.

## features

- Works with any type of function arguments – no serialization is needed.
- Works with any length of function arguments. Length can be set as fixed or dynamic.
- Support for promises and asynchronous functions.
- WeakMap based mode for garbage collection friendly configuration

## API

| Property | Description | Type | Default |
| :----| :---- | :---- | :---- |
| normalizer | Generates a unique value based on the current parameter | (args: any[]) => string | Array.from(argument).join(',') |
| weak | Using WeakMap  | boolean | false |
| timeout | Timeout duration, expired delete | number | undefined |


## Changelog

### 0.0.1
- Basically available, add parameters "normalizer"、 "weak" 、"timeout"

