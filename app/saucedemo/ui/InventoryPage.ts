import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class Inventory extends BasePage {
  //private inventoryItem = this.getItemByTitle(inventoryTitle: string)
  private inventoryContainerLocator: Locator = this.page.locator(
    '[data-test="inventory-container"]'
  );
  private inventoryProductsLabelLocator: Locator = this.page.locator(
    '[data-test="title"]'
  );
  constructor(page: Page) {
    super(page);
  }

  getItemByTitle = (inventoryTitle: string) => {
    const itemByTitleLocator: Locator = this.page
      .locator('[data-test="inventory-item"]')
      .filter({
        has: this.page.locator('[data-test="inventory-item-name"]', {
          hasText: inventoryTitle,
        }),
      });
    return itemByTitleLocator;
  };

  addToCartByTitle = async (inventoryTitle: string) => {
    const item = this.getItemByTitle(inventoryTitle);
    const itemAddToCartButton = item.locator('[id^="add-to-cart"]');
    await itemAddToCartButton.click();
  };

  getItemAddToCartButtonByTitle = (inventoryTitle: string) => {
    const item = this.getItemByTitle(inventoryTitle);
    const itemAddToCartButton = item.locator('[id^="add-to-cart"]');
    return itemAddToCartButton;
  };

  removeFromCartByTitle = async (inventoryTitle: string) => {
    const item = this.getItemByTitle(inventoryTitle);
    const itemRemoveButton = item.locator('[id^="remove"]');
    await itemRemoveButton.click();
  };

  getItemRemoveButtonByTitle = (inventoryTitle: string) => {
    const item = this.getItemByTitle(inventoryTitle);
    const itemRemoveButton = item.locator('[id^="remove"]');
    return itemRemoveButton;
  };

  getPriceByTitle = async (inventoryTitle: string) => {
    const item = this.getItemByTitle(inventoryTitle);

    const price = await item
      .locator('[data-test="inventory-item-price"]')
      .textContent();
    return price;
  };

  inventoryContainer = () => {
    return this.inventoryContainerLocator;
  };

  inventoryProductsLabel = () => {
    return this.inventoryProductsLabelLocator;
  };
}
