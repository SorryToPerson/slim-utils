"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var slimConsole = new index_1.SlimConsole('default');
slimConsole.info('test', 'test');
test('Deep Clone', function () {
    expect((0, index_1.deepClone)('Carl')).toBe('Carl');
});
