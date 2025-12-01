import { test, expect } from '@playwright/test';
import { Login } from '../../app/saucedemo/ui/login-page';
import { Inventory } from '../../app/saucedemo/ui/inventory-page';

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

    await page.goto('https://www.saucedemo.com/');

    await loginPage.login(userName, password);

    const inventoryPage: Inventory = new Inventory(page);

    await expect(inventoryPage.inventoryProductsLabel()).toHaveText('Products');
    await expect(inventoryPage.inventoryContainer()).toBeVisible();
  }
);
