
export default function primitive (args: any[]) {
  let id, i, length = args.length;
  if (!length) return "\u0002";
  id = String(args[i = 0]);
  while (--length) id += "\u0001" + args[++i];
  return id;
};