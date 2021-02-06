const create = Object.create;

export default function get() {
  let lastId = 0, map = [], cache = create(null);
  return {
    get: function (args) {
      let index = 0, set = map, i, length = args.length;
      if (length === 0) return set[length] || null;
      if ((set = set[length])) {
        while (index < length - 1) {
          i = set[0].indexOf(args[index])
          if (i === -1) return null;
          set = set[1][i];
          ++index;
        }
        i = set[0].indexOf(args[index])
        if (i === -1) return null;
        return set[1][i] || null;
      }
      return null;
    },
    set: function (args) {
      let index = 0, set = map, i, length = args.length;
      if (length === 0) {
        set[length] = ++lastId;
      } else {
        if (!set[length]) {
          set[length] = [[], []];
        }
        set = set[length];
        while (index < length - 1) {
          i = set[0].indexOf(args[index])
          if (i === -1) {
            i = set[0].push(args[index]) - 1;
            set[1].push([[], []]);
          }
          set = set[1][i];
          ++index;
        }
        i = set[0].indexOf(args[index]);
        if (i === -1) {
          i = set[0].push(args[index]) - 1;
        }
        set[1][i] = ++lastId;
      }
      cache[lastId] = args;
      return lastId;
    },
    delete: function (id) {
      var index = 0, set = map, i, args = cache[id], length = args.length, path = [];
      if (length === 0) {
        delete set[length];
      } else if ((set = set[length])) {
        while (index < length - 1) {
          i = set[0].indexOf(args[index])
          if (i === -1) {
            return;
          }
          path.push(set, i);
          set = set[1][i];
          ++index;
        }
        i = set[0].indexOf(args[index])
        if (i === -1) {
          return;
        }
        id = set[1][i];
        set[0].splice(i, 1);
        set[1].splice(i, 1);
        while (!set[0].length && path.length) {
          i = path.pop();
          set = path.pop();
          set[0].splice(i, 1);
          set[1].splice(i, 1);
        }
      }
      delete cache[id];
    },
    clear: function () {
      map = [];
      cache = create(null);
    }
  };
};