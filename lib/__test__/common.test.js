"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
test('Deep Clone', function () {
    expect((0, index_1.deepClone)({
        a: {
            b: {
                c: 'deep',
            },
        },
    })).toStrictEqual({
        a: {
            b: {
                c: 'deep',
            },
        },
    });
});
