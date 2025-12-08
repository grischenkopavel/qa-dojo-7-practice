import { expect } from '@playwright/test';
import { test } from '../../../app/saucedemo/fixtures/base-fixture';

const userName = 'standard_user';
const password = 'secret_sauce';

test.describe('Test for the inventory page', { tag: ['@inventory'] }, () => {
  test.use({ userName: userName, userPassword: password });

  test(
    'SD-inventory-fixture:0001. Add inventory item to basket',
    {
      tag: ['@inventory'],
      annotation: {
        type: 'description',
        description:
          'After adding inventory item to the basket button text should change to "Remove"',
      },
    },
    async ({ inventoryPage }) => {
      const inventoryTitle = 'Test.allTheThings() T-Shirt (Red)';

      await inventoryPage.addToCartByTitle(inventoryTitle);

      const inventoryRemoveButton =
        inventoryPage.getItemRemoveButtonByTitle(inventoryTitle);

      await expect(inventoryRemoveButton).toHaveText('Remove');
    }
  );
  test(
    'SD-inventory-fixture:0002. Remove inventory item',
    {
      tag: ['@inventory'],
      annotation: {
        type: 'description',
        description:
          'After removal inventory item button text should change to "Add to cart"',
      },
    },
    async ({ inventoryPage }) => {
      const inventoryTitle = 'Sauce Labs Fleece Jacket';

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
    async ({ inventoryPage }) => {
      const inventoryTitle = 'Test.allTheThings() T-Shirt (Red)';
      const price = await inventoryPage.getPriceByTitle(inventoryTitle);

      const priceNumber = parseFloat(price!.replace(/[^0-9.]/g, ''));

      expect(priceNumber).toBeGreaterThan(0);
      expect(price).toContain('$');
    }
  );
});
