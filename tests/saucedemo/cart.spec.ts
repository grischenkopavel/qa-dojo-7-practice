import { test, expect, Locator } from '@playwright/test';
import { Login } from '../../app/saucedemo/ui/login-page';
import { Cart } from '../../app/saucedemo/ui/cart-page';
import { Inventory } from '../../app/saucedemo/ui/inventory-page';
import { CheckoutStepOnePage } from '../../app/saucedemo/ui/checkout-step-one';

const userName = 'standard_user';
const password = 'secret_sauce';
const inventoryTitle = 'Sauce Labs Bike Light';
const inventoryTitle2 = 'Sauce Labs Fleece Jacket';

test.beforeEach('Login to saucedemo', async ({ page }) => {
  const cartLocator: Locator = page.locator('[data-test="shopping-cart-link"]');
  const loginPage: Login = new Login(page);

  await page.goto('https://www.saucedemo.com/');

  await loginPage.login(userName, password);

  const inventoryPage: Inventory = new Inventory(page);
  await inventoryPage.addToCartByTitle(inventoryTitle);
  await inventoryPage.addToCartByTitle(inventoryTitle2);

  await cartLocator.click();
});

test(
  'SD-cart:0001. Continue Shopping button',
  {
    tag: ['@cart'],
    annotation: {
      type: 'description',
      description:
        'Continue Shopping button redirect back to the inventory page',
    },
  },
  async ({ page }) => {
    const cartPage: Cart = new Cart(page);
    const inventoryPage: Inventory = new Inventory(page);

    await cartPage.continueShopping();

    await expect(inventoryPage.inventoryContainer()).toBeVisible();
    await expect(inventoryPage.inventoryProductsLabel()).toHaveText('Products');
  }
);

test(
  'SD-cart:0002. Checkout button',
  {
    tag: ['@cart'],
    annotation: {
      type: 'description',
      description:
        'Checkout button redirect back to the Checkout page two. Checkout: Your Information label',
    },
  },
  async ({ page }) => {
    const cartPage: Cart = new Cart(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    await cartPage.checkout();

    await expect(checkoutStepOnePage.yourInformationLabel()).toHaveText(
      'Checkout: Your Information'
    );
  }
);

test(
  'SD-cart:0003. Get inventory price by title',
  {
    tag: ['@cart'],
    annotation: {
      type: 'description',
      description:
        'Return price by title. price should be more than 0 and contains $',
    },
  },
  async ({ page }) => {
    const cartPage: Cart = new Cart(page);

    const price = await cartPage.getPriceByTitle(inventoryTitle2);
    const priceNumber = parseFloat(price!.replace(/[^0-9.]/g, ''));

    expect(priceNumber).toBeGreaterThan(0);
    expect(price).toContain('$');
  }
);

test(
  'SD-cart:0004. Remove inventory item from cart by title',
  {
    tag: ['@cart'],
    annotation: {
      type: 'description',
      description: 'Remove inventory item from cart.',
    },
  },
  async ({ page }) => {
    const cartPage: Cart = new Cart(page);
    const initialCount = await cartPage.getItemCount();

    await cartPage.removeItemByTitle(inventoryTitle);

    const afterRemovalCount = await cartPage.getItemCount();

    expect(afterRemovalCount).toBe(initialCount - 1);
  }
);
