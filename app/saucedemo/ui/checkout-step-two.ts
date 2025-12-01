import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutStepTwoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private paymentInformationLocator: Locator = this.page.locator(
    '[data-test="payment-info-value"]'
  );
  private finishButtonLocator: Locator = this.page.locator('[id="finish"]');
  private checkoutOverviewLabelLocator: Locator = this.page.locator(
    '[data-test="title"]'
  );

  getPaymentInformation = async () => {
    return await this.paymentInformationLocator.textContent();
  };

  finishCheckout = async () => {
    await this.finishButtonLocator.click();
  };

  checkoutOverviewLabel = () => {
    return this.checkoutOverviewLabelLocator;
  };
}
