"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: xulibang
 * @Date: 2023-06-12 17:49:25
 * @LastEditors: xulibang
 * @LastEditTime: 2023-06-12 17:50:05
 * @FilePath: /slim-utils/src/__test__/test.ts
 * @Description:
 */
var index_1 = require("../index");
test('Deep Clone', function () {
    expect((0, index_1.deepClone)('Carl')).toBe('Carl');
});
