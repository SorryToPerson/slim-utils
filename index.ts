/*
 * @Author: xulibang
 * @Date: 2023-06-12 11:32:22
 * @LastEditors: xulibang
 * @LastEditTime: 2023-06-12 15:31:07
 * @FilePath: /slim-utils/index.ts
 * @Description:
 */

/**
 * @description: 深拷贝
 * @return {*}
 */
const deepClone = (obj: any) => {
    if (obj === null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;
    let cloneObj = new obj.constructor();
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}

module.exports = {
    deepClone
};
