import { expect } from '@playwright/test';
import { test } from '../../../app/saucedemo/fixtures/base-fixture';

const users = {
  standardUserName: 'standard_user',
  lockedUserName: 'locked_out_user',
  password: 'secret_sauce',
};

test.describe('Tests with standard_user', { tag: ['@login'] }, () => {
  test.use({ userName: users.standardUserName, userPassword: users.password });

  test(
    'SD-login-fixture:0001. Login is successful',
    {
      tag: ['@login'],
      annotation: {
        type: 'description',
        description:
          'Login to the saucedemo is success. Should redirect to the inventory page',
      },
    },
    async ({ inventoryPage }) => {
      await expect(inventoryPage.inventoryProductsLabel()).toHaveText(
        'Products'
      );
      await expect(inventoryPage.inventoryContainer()).toBeVisible();
    }
  );
});

test.describe('Tests with locked_out_user', { tag: ['@login'] }, () => {
  test.use({ userName: users.lockedUserName, userPassword: users.password });

  test(
    'SD-login-fixture:0002. Login is unsuccessful for the locked_out_user',
    {
      tag: ['@login'],
      annotation: {
        type: 'description',
        description:
          'Login to the saucedemo is unsuccessful. Should stay on the login page with message "Sorry, this user has been locked out"',
      },
    },
    async ({ loginPage }) => {
      await expect(loginPage.getLoginButtonLocator()).toBeVisible();
    }
  );

  // Disable after fixture for this describe block
  test.use({
    after: async ({}, use) => {
      await use();
      // Intentionally skip logout - don't call loginPage.logout()
    },
  });
});
