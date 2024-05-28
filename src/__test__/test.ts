import { deepClone, SlimConsole } from '../index';

const s = new SlimConsole('default');

test('Deep Clone', () => {
  expect(deepClone('Carl')).toBe('Carl');
});

s.log('奥德彪');
s.info('你好', 'hook');
s.warn('你好', { test: 'hello' }, true);
s.success('你好', false, 'success');
s.error('你好', 'hook', 'error', 123, false, { 1: 2 }, []);
