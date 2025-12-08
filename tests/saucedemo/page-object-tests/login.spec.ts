import { test, expect } from '@playwright/test';
import { Login } from '../../../app/saucedemo/ui/LoginPage';
import { Inventory } from '../../../app/saucedemo/ui/InventoryPage';

test(
  'SD-login:0001. Login is successful',
  {
    tag: ['@login'],
    annotation: {
      type: 'description',
      description:
        'Login to the saucedemo is success. Should redirect to the inventory page',
    },
  },
  async ({ page }) => {
    const userName = 'standard_user';
    const password = 'secret_sauce';
    const loginPage: Login = new Login(page);
    const inventoryPage: Inventory = new Inventory(page);

    await loginPage.login(userName, password);

    await expect(inventoryPage.inventoryProductsLabel()).toHaveText('Products');
    await expect(inventoryPage.inventoryContainer()).toBeVisible();
  }
);

test(
  'SD-login:0002. Logout is successful',
  {
    tag: ['@login'],
    annotation: {
      type: 'description',
      description:
        'Logout from the saucedemo is success. Should redirect to the login page',
    },
  },
  async ({ page }) => {
    const userName = 'standard_user';
    const password = 'secret_sauce';
    const loginPage: Login = new Login(page);

    await loginPage.login(userName, password);

    await loginPage.logout();
    
    await expect(loginPage.getLoginButtonLocator()).toBeVisible();
  }
);
