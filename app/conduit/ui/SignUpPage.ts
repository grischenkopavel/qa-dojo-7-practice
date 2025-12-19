import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base/BasePage';

export class SignUp extends BasePage {
  private usernameInputLocator: Locator = this.page.locator(
    '[placeholder=Username]'
  );
  private emailInputLocator: Locator = this.page.locator('[placeholder=Email]');
  private passwordInputLocator: Locator = this.page.locator(
    '[placeholder=Password]'
  );
  private signUpButton = this.page.getByRole('button', { name: 'Sign up' });

  constructor(page: Page) {
    super(page);
  }

  signUp = async (userName: string, userEmail: string, password: string) => {
    await this.usernameInputLocator.fill(userName);
    await this.emailInputLocator.fill(userEmail);
    await this.passwordInputLocator.fill(password);
    await this.signUpButton.click();
  };
}
