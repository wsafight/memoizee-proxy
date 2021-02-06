export default function primitiveFixed(length: number) {
  if (!length) {
    return  () => "";
  }
  return function (args: any[]) {
    let id = String(args[0]), i = 0, currentLength = length;
    while (--currentLength) {
      id += "\u0001" + args[++i];
    }
    return id;
  };
};