import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base/BasePage';

export class SignIn extends BasePage {
  private emailInputLocator: Locator = this.page.locator('[placeholder=Email]');
  private passwordInputLocator: Locator = this.page.locator(
    '[placeholder=Password]'
  );
  private signInButton: Locator = this.page.getByRole('button', {
    name: 'Sign in',
  });
  private failLoginMessage: Locator = this.page.getByText(
    'email or password is invalid'
  );

  constructor(page: Page) {
    super(page);
  }

  signIn = async (userEmail: string, password: string) => {
    await this.emailInputLocator.fill(userEmail);
    await this.passwordInputLocator.fill(password);
    await this.signInButton.click();
  };

  getFailLoginMessage = async () => {
    return this.failLoginMessage;
  };
}
