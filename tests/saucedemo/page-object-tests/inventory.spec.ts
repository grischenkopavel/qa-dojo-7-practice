import { test, expect } from '@playwright/test';
import { Login } from '../../../app/saucedemo/ui/LoginPage';
import { Inventory } from '../../../app/saucedemo/ui/InventoryPage';

test.beforeEach('Login to saucedemo', async ({ page }) => {
  const userName = 'standard_user';
  const password = 'secret_sauce';
  const loginPage: Login = new Login(page);

  await page.goto('https://www.saucedemo.com/');

  await loginPage.login(userName, password);
});

test(
  'SD-inventory:0001. Add inventory item to basket',
  {
    tag: ['@inventory'],
    annotation: {
      type: 'description',
      description:
        'After adding inventory item to the basket button text should change to "Remove"',
    },
  },
  async ({ page }) => {
    const inventoryTitle = 'Test.allTheThings() T-Shirt (Red)';
    const inventoryPage: Inventory = new Inventory(page);

    await inventoryPage.addToCartByTitle(inventoryTitle);

    const inventoryRemoveButton =
      inventoryPage.getItemRemoveButtonByTitle(inventoryTitle);

    await expect(inventoryRemoveButton).toHaveText('Remove');
  }
);
test(
  'SD-inventory:0002. Remove inventory item',
  {
    tag: ['@inventory'],
    annotation: {
      type: 'description',
      description:
        'After removal inventory item button text should change to "Add to cart"',
    },
  },
  async ({ page }) => {
    const inventoryTitle = 'Sauce Labs Fleece Jacket';
    const inventoryPage: Inventory = new Inventory(page);

    await inventoryPage.addToCartByTitle(inventoryTitle);

    await inventoryPage.removeFromCartByTitle(inventoryTitle);

    await expect(
      inventoryPage.getItemAddToCartButtonByTitle(inventoryTitle)
    ).toHaveText('Add to cart');
  }
);

test(
  'SD-inventory:0003. Get price by title',
  {
    tag: ['@inventory'],
    annotation: {
      type: 'description',
      description:
        'Return price by title. price should be more than 0 and contains $',
    },
  },
  async ({ page }) => {
    const inventoryTitle = 'Test.allTheThings() T-Shirt (Red)';
    const inventoryPage: Inventory = new Inventory(page);
    const price = await inventoryPage.getPriceByTitle(inventoryTitle);

    const priceNumber = parseFloat(price!.replace(/[^0-9.]/g, ''));

    expect(priceNumber).toBeGreaterThan(0);
    expect(price).toContain('$');
  }
);
