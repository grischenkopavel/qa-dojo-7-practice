import { Page, Locator } from '@playwright/test';

export function getAllCheckBoxPageLocators(page: Page, treeNodeType: string) {
  const expandAllButtonLocator: Locator = page.locator(
    '//button[contains(@title, "Expand all")]'
  );
  const getCheckboxByTypeLocator: Locator = page.locator(
    `//input[contains(@id, "${treeNodeType}") and @type="checkbox"]/following-sibling::span[contains(@class, "checkbox")]`
  );
  return {
    expandAllButtonLocator,
    getCheckboxByTypeLocator,
  };
}

export async function clickExpandAllButton(page: Page) {
  await getAllCheckBoxPageLocators(page, '').expandAllButtonLocator.click();
}

export async function checkCheckboxByType(page: Page, treeNodeType: string) {
  await getAllCheckBoxPageLocators(page, treeNodeType).getCheckboxByTypeLocator.check({force: true})
}
