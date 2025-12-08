import { test, expect } from '@playwright/test';
import { Login } from '../../../app/saucedemo/ui/LoginPage';
import { Cart } from '../../../app/saucedemo/ui/CartPage';
import { Inventory } from '../../../app/saucedemo/ui/InventoryPage';
import { CheckoutStepOnePage } from '../../../app/saucedemo/ui/CheckoutStepOne';
import { CheckoutStepTwoPage } from '../../../app/saucedemo/ui/CheckoutStepTwo';

const userName = 'standard_user';
const password = 'secret_sauce';
const inventoryTitle = 'Sauce Labs Bike Light';
const inventoryTitle2 = 'Sauce Labs Fleece Jacket';

test.describe('Checkout Step Two Page', async () => {
  test.beforeEach('Login to saucedemo', async ({ page }) => {
    const loginPage: Login = new Login(page);

    await page.goto('https://www.saucedemo.com/');

    await loginPage.login(userName, password);

    const inventoryPage: Inventory = new Inventory(page);
    await inventoryPage.addToCartByTitle(inventoryTitle);
    await inventoryPage.addToCartByTitle(inventoryTitle2);

    await inventoryPage.clickCartLink();

    const cartPage: Cart = new Cart(page);
    await cartPage.checkout();

    const checkoutStepOne = new CheckoutStepOnePage(page);

    await checkoutStepOne.checkout('Bill', 'Brown', '90210');
  });

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
    async ({ page }) => {
      const checkoutStepTwo = new CheckoutStepTwoPage(page);

      const paymentInformation = await checkoutStepTwo.getPaymentInformation();
      expect(paymentInformation).toContain('SauceCard #');

      await checkoutStepTwo.finishCheckout();

      await expect(page.locator('[data-test="title"]')).toHaveText(
        'Checkout: Complete!'
      );
    }
  );
});
