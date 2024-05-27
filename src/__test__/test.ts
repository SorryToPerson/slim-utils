import { deepClone, SlimConsole } from '../index';

const slimConsole = new SlimConsole('default');

slimConsole.info('test', 'test');

test('Deep Clone', () => {
  expect(deepClone('Carl')).toBe('Carl');
});
