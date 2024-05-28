// 数组转Map
export function arr2obj(arr: Array<any>, keyName: string, valueName: string) {
  return arr.reduce((obj, item) => {
    if (item.hasOwnProperty(keyName) && item.hasOwnProperty(valueName)) {
      const key = item[keyName];
      const value = item[valueName];
      // 确保键和值都是可接受的类型
      if (key != null && value != null) {
        obj[key] = value;
      }
    }
    return obj;
  }, {});
}

// Map转数组
export function obj2arr(obj: object, keyMap: string, valueMap: string) {
  return Array.from(Object.entries(obj)).map(([key, value]) => ({
    [keyMap]: key,
    [valueMap]: value,
  }));
}
