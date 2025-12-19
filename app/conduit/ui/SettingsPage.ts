import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base/BasePage';

export class SettingsPage extends BasePage {
  private logoutButton: Locator = this.page.getByRole('button', {
    name: 'Or click here to logout.',
  });
  private updateSettingsButton: Locator = this.page.getByRole('button', {
    name: 'Update Settings',
  });

  constructor(page: Page) {
    super(page);
  }

  clickLogoutButton = async () => {
    this.logoutButton.click();
  };

  clickUpdateSettingsButton = async () => {
    this.updateSettingsButton.click();
  };
}
