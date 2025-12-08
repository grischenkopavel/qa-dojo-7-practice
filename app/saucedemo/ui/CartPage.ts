import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class Cart extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private getItemByTitle = (inventoryTitle: string) => {
    const itemByTitleLocator = this.page
      .locator('[data-test="inventory-item"]')
      .filter({
        has: this.page.locator('[data-test="inventory-item-name"]', {
          hasText: inventoryTitle,
        }),
      });
    return itemByTitleLocator;
  };

  getPriceByTitle = async (inventoryTitle: string) => {
    const item = this.getItemByTitle(inventoryTitle);

    const price = await item
      .locator('[data-test="inventory-item-price"]')
      .textContent();
    return price;
  };

  removeItemByTitle = async (inventoryTitle: string) => {
    const item = this.getItemByTitle(inventoryTitle);
    await item.locator('[id^="remove"]').click();
  };

  continueShopping = async () => {
    await this.page.locator('[id="continue-shopping"]').click();
  };

  checkout = async () => {
    await this.page.locator('[id="checkout"]').click();
  };

  getItemCount = async () => {
    const itemsCount = await this.page
      .locator('[data-test="inventory-item"]')
      .count();
    return itemsCount;
  };
}
