// 平铺多维数组
export function flatArr(arr: Array<any>, depth = Infinity): any[] {
  return arr.reduce((acc, cur) => {
    return acc.concat(
      Array.isArray(cur) && depth > 1 ? flatArr(cur, depth - 1) : cur,
    );
  }, []);
}
