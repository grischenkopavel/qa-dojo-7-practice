import { expect } from '@playwright/test';
import { test } from '../../../app/saucedemo/fixtures/base-fixture';

const userName = 'standard_user';
const password = 'secret_sauce';
const inventoryTitle = 'Sauce Labs Bike Light';
const inventoryTitle2 = 'Sauce Labs Fleece Jacket';

test.describe('Checkout Step Two Page', { tag: ['@checkout'] }, async () => {
  test.use({ userName: userName, userPassword: password });

  test(
    'SD-checkout-page-two:0001. Fill checkout form on page two',
    {
      tag: ['@checkout'],
      annotation: {
        type: 'description',
        description:
          'Success fill checkout form on page one redirects to the second page. "Finish" button is visible',
      },
    },
    async ({
      page,
      cartPage,
      inventoryPage,
      checkoutStepOnePage,
      checkoutStepTwoPage,
    }) => {
      await inventoryPage.addToCartByTitle(inventoryTitle);
      await inventoryPage.addToCartByTitle(inventoryTitle2);

      await inventoryPage.clickCartLink();
      await cartPage.checkout();

      await checkoutStepOnePage.checkout('Bill', 'Brown', '90210');

      const paymentInformation =
        await checkoutStepTwoPage.getPaymentInformation();
      expect(paymentInformation).toContain('SauceCard #');

      await checkoutStepTwoPage.finishCheckout();

      await expect(page.locator('[data-test="title"]')).toHaveText(
        'Checkout: Complete!'
      );
    }
  );
});
