import { arr2obj, obj2arr } from '../index';

test('arr to object', () => {
  expect(
    arr2obj(
      [
        { name: 'zs', age: 12 },
        { name: 'ls', age: 24 },
      ],
      'name',
      'age',
    ),
  ).toStrictEqual({ zs: 12, ls: 24 });
});

test('object to arr', () => {
  expect(
    obj2arr(
      { zs: 12, ls: 24 },

      'name',
      'age',
    ),
  ).toStrictEqual([
    { name: 'zs', age: 12 },
    { name: 'ls', age: 24 },
  ]);
});
