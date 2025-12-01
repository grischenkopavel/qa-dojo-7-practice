import { test, expect } from '@playwright/test';

test('Compare objects in tests', async () => {
  const obj1 = {
    a: 1,
    b: 2,
  };
  const obj2 = {
    a: 1,
    b: 2,
  };

  expect(obj1).toMatchObject(obj2);
});
