import { test, expect, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {
  clickSubmit,
  fillAddress,
  fillEmail,
  fillName,
  fillPermanentAddress,
  getFormLocators,
} from '../../app/demo-qa/ui/text-box-actions';

import {
  clickExpandAllButton,
  checkCheckboxByType,
  getAllCheckBoxPageLocators,
} from '../../app/demo-qa/ui/checkbox-actions';

import {
  getAllRadioButtonPageLocators,
  checkYesRadioButton,
  checkImpressiveRadioButton,
} from '../../app/demo-qa/ui/radiobutton-actions';

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
      //Arrange
      const firstName = faker.person.firstName();
      const fullName = faker.person.fullName({ firstName: firstName });
      const personEmail = faker.internet.email({
        firstName: firstName,
        provider: 'faker.com',
      });
      const personAddress = faker.location.streetAddress({
        useFullAddress: true,
      });
      const personPermanentAddress = faker.location.streetAddress({
        useFullAddress: true,
      });

      //Act
      await page.goto(`/text-box`);
      await fillName(page, fullName);
      await fillEmail(page, personEmail);
      await fillAddress(page, personAddress);
      await fillPermanentAddress(page, personPermanentAddress);
      await clickSubmit(page);

      //Assert
      await expect(page).toHaveURL(`${baseURL}/text-box`);
      await expect(getFormLocators(page).textBoxFormHeaderLocator).toHaveText(
        'Text Box'
      );
      await expect(getFormLocators(page).outputFullNameLocator).toContainText(
        fullName
      );
      await expect(getFormLocators(page).outputEmailLocator).toContainText(
        personEmail
      );
      await expect(getFormLocators(page).outputAddressLocator).toContainText(
        personAddress
      );
      await expect(
        getFormLocators(page).outputPermanentAddressLocator
      ).toContainText(personPermanentAddress);
    }
  );

  test(
    'Checkbox find and check',
    {
      annotation: {
        type: 'description',
        description: 'Checkbox check is success',
      },
    },
    async ({ page, baseURL }) => {
      //Arrange
      const treeNodeType: string = `office`;
      //Act
      await page.goto('/checkbox');
      await expect(page).toHaveURL(`${baseURL}/checkbox`);

      await clickExpandAllButton(page);
      await checkCheckboxByType(page, treeNodeType);
      //Assert
      await expect(
        (getAllCheckBoxPageLocators(page, treeNodeType)).getCheckboxByTypeLocator
      ).toBeChecked();
    }
  );

  test(
    'Radio button selection',
    {
      annotation: {
        type: 'description',
        description: 'Radio button selection is success',
      },
    },
    async ({ page, baseURL }) => {
      await page.goto(`/radio-button`);

      await expect(page).toHaveURL(`${baseURL}/radio-button`);

      await checkYesRadioButton(page);

      await expect(
        getAllRadioButtonPageLocators(page).yesRadioButtonLocator
      ).toBeChecked();

      await checkImpressiveRadioButton(page);

      await expect(
        getAllRadioButtonPageLocators(page).impressiveRadioButtonLocator
      ).toBeChecked();
    }
  );
});
