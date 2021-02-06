interface MemoizeOptions {
  /** 保证缓存函数参数的唯一性 */
  normalizer: any;
  async?: boolean
}

export default function memoize(fn: any, options?: MemoizeOptions) {

  if (!options.normalizer) {

    // length = options.length = resolveLength(options.length, fn.length, options.async);
    // if (length !== 0) {
    //   if (options.primitive) {
    //     if (length === false) {
    //       options.normalizer = require("./normalizers/primitive");
    //     } else if (length > 1) {
    //       options.normalizer = require("./normalizers/get-primitive-fixed")(length);
    //     }
    //   } else if (length === false) options.normalizer = require("./normalizers/get")();
    //   else if (length === 1) options.normalizer = require("./normalizers/get-1")();
    //   else options.normalizer = require("./normalizers/get-fixed")(length);
    // }
  }

  // Assure extensions
  if (options.async) require("./ext/async");
  // if (options.promise) require("./ext/promise");
  // if (options.dispose) require("./ext/dispose");
  // if (options.maxAge) require("./ext/max-age");
  // if (options.max) require("./ext/max");
  // if (options.refCounter) require("./ext/ref-counter");

  // return plain(fn, options);
}