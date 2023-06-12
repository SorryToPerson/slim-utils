/*
 * @Author: xulibang
 * @Date: 2023-06-12 11:32:22
 * @LastEditors: xulibang
 * @LastEditTime: 2023-06-12 17:55:46
 * @FilePath: /slim-utils/src/index.ts
 * @Description:
 */

/**
 * @description: 深拷贝
 * @return {*}
 */
export const deepClone = (obj: any) => {
    if (obj === null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;
    const cloneObj = new obj.constructor();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}


