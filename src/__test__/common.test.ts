import { deepClone } from '../index';

test('Deep Clone', () => {
  expect(
    deepClone({
      a: {
        b: {
          c: 'deep',
        },
      },
    }),
  ).toStrictEqual({
    a: {
      b: {
        c: 'deep',
      },
    },
  });
});
