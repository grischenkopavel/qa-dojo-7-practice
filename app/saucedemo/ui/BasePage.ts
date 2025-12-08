import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  private mainMenuLocator: Locator;
  private logoutLinkLocator: Locator;
  private cartLinkLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainMenuLocator = page.getByRole('button', {
      name: 'Open Menu',
    });
    this.logoutLinkLocator = page.locator('[data-test="logout-sidebar-link"]');
    this.cartLinkLocator = page.locator('[data-test="shopping-cart-link"]');
  }

  clickCartLink = async () => {
    await this.cartLinkLocator.click();
  };

  logout = async () => {
    await this.mainMenuLocator.click();
    await this.logoutLinkLocator.click({ delay: 500 });
  };
}
