import { test, expect, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('DQ-0001', { tag: [] }, async () => {
  test.beforeEach('Navigate to base url page', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`);
  });
  test(
    'Fill and submit form',
    {
      annotation: {
        type: 'description',
        description: 'Form submit is successful',
      },
    },
    async ({ page, baseURL }) => {
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
      const outputSecondaryAddressLocator: Locator = page.locator(
        '//div[@id="output"]//child::*[@id="permanentAddress"]'
      );

      await page.goto(`/text-box`);
      await expect(page).toHaveURL(`${baseURL}/text-box`);
      await expect(
        page.locator(
          "//h1[contains(@class, 'text-center') and text()='Text Box']"
        )
      ).toHaveText('Text Box');

      const fullName = faker.person.fullName();
      const personEmail = faker.internet.email({ provider: 'test.com' });
      const personAddress = faker.location.streetAddress({
        useFullAddress: true,
      });
      const personSecondaryAddress = faker.location.streetAddress({
        useFullAddress: true,
      });

      await fullNameLocator.fill(fullName);
      await emailLocator.fill(personEmail);
      await addressLocator.fill(personAddress);
      await secondaryAddressLocator.fill(personSecondaryAddress);
      await submitButtonLocator.click();

      await expect(outputFullNameLocator).toContainText(fullName);
      await expect(outputEmailLocator).toContainText(personEmail);
      await expect(outputAddressLocator).toContainText(personAddress);
      await expect(outputSecondaryAddressLocator).toContainText(
        personSecondaryAddress
      );
    }
  );

  test(
    'Checkbox',
    {
      annotation: {
        type: 'description',
        description: 'Checkbox click is success',
      },
    },
    async ({ page, baseURL }) => {
      const expandAll: Locator = page.locator(
        `//button[contains(@title, "Expand all")]`
      );
      const treeNodeType: string = (`office`);
      const checkboxLocator: Locator = page.locator(
        `//input[contains(@id, '${treeNodeType}') and @type="checkbox"]/following-sibling::span[contains(@class, "checkbox")]`
      );

      await page.goto('/checkbox');
      await expect(page).toHaveURL(`${baseURL}/checkbox`);

      await expandAll.click();
      await checkboxLocator.check({ force: true });
      await expect(checkboxLocator).toBeChecked();
    }
  );

  test(
    'Radio button',
    {
      annotation: {
        type: 'description',
        description: 'Radio button selection is success',
      },
    },
    async ({ page, baseURL }) => {
      const yesRadioLocator: Locator = page.locator(
        '//input[contains(@id, "yesRadio")]'
      );
      const impressiveRadioLocator: Locator = page.locator(
        '//input[contains(@id, "impressiveRadio")]'
      );

      await page.goto(`/radio-button`);

      await expect(page).toHaveURL(`${baseURL}/radio-button`);

      await yesRadioLocator.check({ force: true });
      await expect(yesRadioLocator).toBeChecked();

      await impressiveRadioLocator.check({ force: true });
      await expect(impressiveRadioLocator).toBeChecked();
    }
  );
});
