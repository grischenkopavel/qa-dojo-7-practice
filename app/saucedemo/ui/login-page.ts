import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class Login extends BasePage {
  private userNameTextBoxLocator: Locator = this.page.locator(
    '[data-test="username"]'
  );

  private passwordTextBoxLocator: Locator = this.page.locator(
    '[data-test="password"]'
  );
  private loginButtonLocator: Locator = this.page.locator(
    '[data-test="login-button"]'
  );

  constructor(page: Page) {
    super(page);
  }
  private fillUserName = async (userName: string) => {
    await this.userNameTextBoxLocator.fill(userName);
  };

  private fillPassword = async (password: string) => {
    await this.passwordTextBoxLocator.fill(password);
  };

  private clickLoginButton = async () => {
    await this.loginButtonLocator.click();
  };

  login = async (userName: string, password: string) => {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLoginButton();
  };
}
