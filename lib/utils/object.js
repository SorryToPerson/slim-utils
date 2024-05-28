"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj2arr = exports.arr2obj = void 0;
// 数组转Map
function arr2obj(arr, keyName, valueName) {
    return arr.reduce(function (obj, item) {
        if (item.hasOwnProperty(keyName) && item.hasOwnProperty(valueName)) {
            var key = item[keyName];
            var value = item[valueName];
            // 确保键和值都是可接受的类型
            if (key != null && value != null) {
                obj[key] = value;
            }
        }
        return obj;
    }, {});
}
exports.arr2obj = arr2obj;
// Map转数组
function obj2arr(obj, keyMap, valueMap) {
    return Array.from(Object.entries(obj)).map(function (_a) {
        var _b;
        var key = _a[0], value = _a[1];
        return (_b = {},
            _b[keyMap] = key,
            _b[valueMap] = value,
            _b);
    });
}
exports.obj2arr = obj2arr;
