import { Locator, Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

export class LoggedOutPage extends BasePage {
  protected signUpLink: Locator = this.page.getByRole('link', {
    name: 'Sign up',
  });
  protected signInLink: Locator = this.page.getByRole('link', {
    name: 'Sign in',
  });

  constructor(page: Page) {
    super(page);
  }

  clickSignUpLink = async () => {
    await this.signUpLink.click();
  };

  clickSignInLink = async () => {
    await this.signInLink.click();
  };

  getSignInLink = async () => {
    return this.signInLink;
  };

  getSignUpLink = async () => {
    return this.signUpLink;
  };
}
