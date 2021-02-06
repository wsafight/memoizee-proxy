# memoizee-proxy

Read this in other languages: [简体中文](https://github.com/LazierGame/react-time-range-selector/blob/main/README.zh-CN.md)


Memoize based on Proxy.

## features


## API

| Property | Description | Type | Default |
| :----| :---- | :---- | :---- |
| normalizer | Generates a unique value based on the current parameter | (args: any[]) => string | Array.from(argument).join(',') |
| weak | Using WeakMap  | boolean | false |
| timeout | Timeout duration, expired delete | number | undefined |


