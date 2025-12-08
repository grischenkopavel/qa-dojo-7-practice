import { expect } from '@playwright/test';
import { test } from '../../../app/saucedemo/fixtures/base-fixture';

const userName = 'standard_user';
const password = 'secret_sauce';
const inventoryTitle = 'Sauce Labs Bike Light';
const inventoryTitle2 = 'Sauce Labs Fleece Jacket';

test.describe('Test for the cart page', { tag: ['@cart'] }, () => {
  test.use({ userName: userName, userPassword: password });

  test.beforeEach('Add items to cart by title', async ({ inventoryPage }) => {
    await inventoryPage.addToCartByTitle(inventoryTitle);
    await inventoryPage.addToCartByTitle(inventoryTitle2);

    await inventoryPage.clickCartLink();
  });

  test(
    'SD-cart-fixture:0001. Continue Shopping button',
    {
      tag: ['@cart'],
      annotation: {
        type: 'description',
        description:
          'Continue Shopping button redirect back to the inventory page',
      },
    },
    async ({ cartPage, inventoryPage }) => {
      await cartPage.continueShopping();

      await expect(inventoryPage.inventoryContainer()).toBeVisible();
      await expect(inventoryPage.inventoryProductsLabel()).toHaveText(
        'Products'
      );
    }
  );

  test(
    'SD-cart-fixture:0002. Checkout button',
    {
      tag: ['@cart'],
      annotation: {
        type: 'description',
        description:
          'Checkout button redirect back to the Checkout page two. Checkout: Your Information label',
      },
    },
    async ({ cartPage, checkoutStepOnePage }) => {
      await cartPage.checkout();

      await expect(checkoutStepOnePage.yourInformationLabel()).toHaveText(
        'Checkout: Your Information'
      );
    }
  );

  test(
    'SD-cart-fixture:0003. Get inventory price by title',
    {
      tag: ['@cart'],
      annotation: {
        type: 'description',
        description:
          'Return price by title. price should be more than 0 and contains $',
      },
    },
    async ({ cartPage }) => {
      const price = await cartPage.getPriceByTitle(inventoryTitle2);
      const priceNumber = parseFloat(price!.replace(/[^0-9.]/g, ''));

      expect(priceNumber).toBeGreaterThan(0);
      expect(price).toContain('$');
    }
  );

  test(
    'SD-cart-fixture:0004. Remove inventory item from cart by title',
    {
      tag: ['@cart'],
      annotation: {
        type: 'description',
        description: 'Remove inventory item from cart.',
      },
    },
    async ({ cartPage }) => {
      const initialCount = await cartPage.getItemCount();

      await cartPage.removeItemByTitle(inventoryTitle);

      const afterRemovalCount = await cartPage.getItemCount();

      expect(afterRemovalCount).toBe(initialCount - 1);
    }
  );
});
