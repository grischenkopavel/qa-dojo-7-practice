import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutStepOnePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private firstNameLocator: Locator = this.page.getByPlaceholder('First Name');
  private lastNameLocator: Locator = this.page.getByPlaceholder('Last Name');
  private zipCodeLocator: Locator =
    this.page.getByPlaceholder('Zip/Postal Code');
  private continueButtonLocator: Locator = this.page.locator('[id="continue"]');
  private yourInformationLabelLocator: Locator = this.page.locator(
    '[data-test="title"]'
  );

  private fillFirstName = async (firstName: string) => {
    await this.firstNameLocator.fill(firstName);
  };

  private fillLastName = async (lastName: string) => {
    await this.lastNameLocator.fill(lastName);
  };

  private fillZipCode = async (zipCode: string) => {
    await this.zipCodeLocator.fill(zipCode);
  };

  private clickContinueButton = async () => {
    await this.continueButtonLocator.click();
  };

  checkout = async (firstName: string, lastName: string, zipCode: string) => {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillZipCode(zipCode);
    await this.clickContinueButton();
  };

  yourInformationLabel = () => {
    return this.yourInformationLabelLocator;
  };
}
