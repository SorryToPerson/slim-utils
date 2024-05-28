"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
test('arr to object', function () {
    expect((0, index_1.arr2obj)([
        { name: 'zs', age: 12 },
        { name: 'ls', age: 24 },
    ], 'name', 'age')).toStrictEqual({ zs: 12, ls: 24 });
});
test('object to arr', function () {
    expect((0, index_1.obj2arr)({ zs: 12, ls: 24 }, 'name', 'age')).toStrictEqual([
        { name: 'zs', age: 12 },
        { name: 'ls', age: 24 },
    ]);
});
