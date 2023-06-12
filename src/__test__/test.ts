/*
 * @Author: xulibang
 * @Date: 2023-06-12 17:49:25
 * @LastEditors: xulibang
 * @LastEditTime: 2023-06-12 17:50:05
 * @FilePath: /slim-utils/src/__test__/test.ts
 * @Description:
 */
import { deepClone } from '../index';

test('Deep Clone', () => {
  expect(deepClone('Carl')).toBe('Carl');
});
