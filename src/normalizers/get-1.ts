export default function get1() {
  let lastId = 0, argsMap = [], cache = [];
  return {
    get: function (args) {
      const index = args.indexOf(args[0])
      return index === -1 ? null : cache[index];
    },
    set: function (args) {
      argsMap.push(args[0]);
      cache.push(++lastId);
      return lastId;
    },
    delete: function (id) {
      const index = cache.indexOf(id)
      if (index !== -1) {
        argsMap.splice(index, 1);
        cache.splice(index, 1);
      }
    },
    clear: function () {
      argsMap = [];
      cache = [];
    }
  };
};