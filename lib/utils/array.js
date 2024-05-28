"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatArr = void 0;
// 平铺多维数组
function flatArr(arr, depth) {
    if (depth === void 0) { depth = Infinity; }
    return arr.reduce(function (acc, cur) {
        return acc.concat(Array.isArray(cur) && depth > 1 ? flatArr(cur, depth - 1) : cur);
    }, []);
}
exports.flatArr = flatArr;
