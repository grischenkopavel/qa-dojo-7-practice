import { expect } from '@playwright/test';
import { test } from '../../../app/saucedemo/fixtures/base-fixture';

const userName = 'standard_user';
const password = 'secret_sauce';
const inventoryTitle = 'Sauce Labs Bike Light';
const inventoryTitle2 = 'Sauce Labs Fleece Jacket';

test.describe('Checkout Step One Page', { tag: ['@checkout'] }, async () => {
  test.use({ userName: userName, userPassword: password });

  test(
    'SD-checkout-page-one:0001. Fill checkout form on page one',
    {
      tag: ['@checkout'],
      annotation: {
        type: 'description',
        description:
          'Success fill checkout form on page one redirects to the second page. Checkout: Overview label has text "Checkout: Overview"',
      },
    },
    async ({
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

      await expect(checkoutStepTwoPage.checkoutOverviewLabel()).toHaveText(
        'Checkout: Overview'
      );
    }
  );
});
