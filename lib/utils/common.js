"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = void 0;
/**
 * @description: 深拷贝
 * @return {*}
 */
var deepClone = function (obj) {
    if (obj === null)
        return obj;
    if (obj instanceof Date)
        return new Date(obj);
    if (obj instanceof RegExp)
        return new RegExp(obj);
    if (typeof obj !== 'object')
        return obj;
    var cloneObj = new obj.constructor();
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = (0, exports.deepClone)(obj[key]);
        }
    }
    return cloneObj;
};
exports.deepClone = deepClone;
