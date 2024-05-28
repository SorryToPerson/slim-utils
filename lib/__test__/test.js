"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var s = new index_1.SlimConsole('default');
test('Deep Clone', function () {
    expect((0, index_1.deepClone)('Carl')).toBe('Carl');
});
s.log('奥德彪');
s.info('你好', 'hook');
s.warn('你好', { test: 'hello' }, true);
s.success('你好', false, 'success');
s.error('你好', 'hook', 'error', 123, false, { 1: 2 }, []);
