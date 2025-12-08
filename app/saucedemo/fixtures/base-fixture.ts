import { test as base } from '@playwright/test';
import { Login } from '../ui/LoginPage';
import { Inventory } from '../ui/InventoryPage';
import { Cart } from '../../../app/saucedemo/ui/CartPage';
import { CheckoutStepOnePage } from '../../../app/saucedemo/ui/CheckoutStepOne';
import { CheckoutStepTwoPage } from '../../../app/saucedemo/ui/CheckoutStepTwo';

type SauceDemoFixture = {
  userName: string | undefined;
  userPassword: string | undefined;
  before: void;
  after: void;
  loginPage: Login;
  inventoryPage: Inventory;
  cartPage: Cart;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
};

export const test = base.extend<SauceDemoFixture>({
  userName: 'standard_user',
  userPassword: 'secret_sauce',
  before: [
    async ({ loginPage, userName, userPassword }, use) => {
      await loginPage.login(userName!, userPassword!);
      await use();
    },
    { auto: true, title: 'Auto fixture to login to the saucedemo' },
  ],

  after: [
    async ({ loginPage }, use) => {
      await use();
      await loginPage.logout();
    },
    { auto: true, title: 'Auto fixture to logout from the saucedemo' },
  ],

  loginPage: [
    async ({ page }, use) => {
      const loginPage = new Login(page);

      await use(loginPage);
    },
    { title: 'Fixture for login page' },
  ],

  inventoryPage: [
    async ({ page }, use) => {
      const inventoryPage = new Inventory(page);

      await use(inventoryPage);
    },
    { title: 'Fixture for the inventory page' },
  ],

  cartPage: [
    async ({ page }, use) => {
      const cartPage = new Cart(page);

      await use(cartPage);
    },
    { title: 'Fixture for the cart page' },
  ],

  checkoutStepOnePage: [
    async ({ page }, use) => {
      const checkoutStepOnePage = new CheckoutStepOnePage(page);

      await use(checkoutStepOnePage);
    },
    { title: 'Fixture for the checkout Step One page' },
  ],
  
  checkoutStepTwoPage: [
    async ({ page }, use) => {
      const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

      await use(checkoutStepTwoPage);
    },
    { title: 'Fixture for the checkout Step Two page' },
  ],
});
