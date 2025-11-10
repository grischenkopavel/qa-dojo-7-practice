import { Page, Locator } from '@playwright/test';

export function getFormLocators(page: Page) {
  const fullNameLocator: Locator = page.locator('//input[@id="userName"]');
  const emailLocator: Locator = page.locator('//input[@id="userEmail"]');
  const addressLocator: Locator = page.locator(
    '//textarea[@id="currentAddress" and @placeholder="Current Address"]'
  );
  const secondaryAddressLocator: Locator = page.locator(
    '//textarea[@id="permanentAddress"]'
  );
  const submitButtonLocator: Locator = page.locator('//button[@id="submit"]');
  const outputFullNameLocator: Locator = page.locator(
    '//div[@id="output"]//child::*[@id="name"]'
  );
  const outputEmailLocator: Locator = page.locator(
    '//div[@id="output"]//child::*[@id="email"]'
  );
  const outputAddressLocator: Locator = page.locator(
    '//div[@id="output"]//child::*[@id="currentAddress"]'
  );
  const outputPermanentAddressLocator: Locator = page.locator(
    '//div[@id="output"]//child::*[@id="permanentAddress"]'
  );

  const textBoxFormHeaderLocator: Locator = page.locator(
    "//h1[contains(@class, 'text-center') and text()='Text Box']"
  );

  return {
    fullNameLocator,
    emailLocator,
    addressLocator,
    secondaryAddressLocator,
    submitButtonLocator,
    outputFullNameLocator,
    outputEmailLocator,
    outputAddressLocator,
    outputPermanentAddressLocator,
    textBoxFormHeaderLocator,
  };
}

export async function fillName(page: Page, name: string) {
  await getFormLocators(page).fullNameLocator.fill(name);
}

export async function fillEmail(page: Page, email: string) {
  await getFormLocators(page).emailLocator.fill(email);
}

export async function fillAddress(page: Page, address: string) {
  await getFormLocators(page).addressLocator.fill(address);
}

export async function fillPermanentAddress(
  page: Page,
  permanentAddress: string
) {
  await getFormLocators(page).secondaryAddressLocator.fill(permanentAddress);
}

export async function clickSubmit(page: Page) {
  await getFormLocators(page).submitButtonLocator.click();
}
