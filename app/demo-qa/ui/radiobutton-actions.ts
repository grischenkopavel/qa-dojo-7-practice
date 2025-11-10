import { Locator, Page } from '@playwright/test';

export function getAllRadioButtonPageLocators(page: Page) {
  const yesRadioButtonLocator: Locator = page.locator(
    '//input[contains(@id, "yesRadio")]'
  );
  const impressiveRadioButtonLocator: Locator = page.locator(
    '//input[contains(@id, "impressiveRadio")]'
  );
  return {
    yesRadioButtonLocator,
    impressiveRadioButtonLocator,
  };
}

export async function checkYesRadioButton(page: Page) {
  await getAllRadioButtonPageLocators(page).yesRadioButtonLocator.check({
    force: true,
  });
}

export async function checkImpressiveRadioButton(page: Page) {
  await getAllRadioButtonPageLocators(page).impressiveRadioButtonLocator.check({
    force: true,
  });
}
