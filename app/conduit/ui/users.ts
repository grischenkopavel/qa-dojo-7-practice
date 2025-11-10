import { Page, Locator } from '@playwright/test';

const {
  EMAIL = 'default@email.com',
  USER_NAME = 'defaultName',
  PASSWORD = 'default_pass',
} = process.env;

export function getLoginPageLocators(page: Page) {
  const emailInputLocator: Locator = page.locator('[placeholder=Email]');
  const passwordInputLocator: Locator = page.locator('[placeholder=Password]');
  const signInButtonLocator: Locator = page
    .locator('[class*="btn"]')
    .filter({ hasText: 'Sign in' });
  return {
    emailInputLocator,
    passwordInputLocator,
    signInButtonLocator,
  };
}

export async function isLogin(page: Page, email: string, password: string) {
  await page.goto(`https://demo.learnwebdriverio.com/login`);
  await getLoginPageLocators(page).emailInputLocator.fill(email);
  await getLoginPageLocators(page).passwordInputLocator.fill(password);
  await getLoginPageLocators(page).signInButtonLocator.click({
    button: 'left',
  });

  const editorLocator: Locator = page.locator('[href="/editor"]');

  try {
    await editorLocator.waitFor({
      state: 'attached',
      timeout: 1000,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export function getRegisterPageLocators(page: Page) {
  const usernameInputLocator: Locator = page.locator('[placeholder=Username]');
  const emailInputLocator: Locator = page.locator('[placeholder=Email]');
  const passwordInputLocator: Locator = page.locator('[placeholder=Password]');
  const signUpButtonLocator: Locator = page.locator('[class*="btn"]');

  return {
    usernameInputLocator,
    emailInputLocator,
    passwordInputLocator,
    signUpButtonLocator,
  };
}

export async function createUser(
  page: Page,
  userName: string,
  userEmail: string,
  userPassword: string
) {
  await page.goto(`https://demo.learnwebdriverio.com/register`);
  await getRegisterPageLocators(page).usernameInputLocator.fill(userName);
  await getRegisterPageLocators(page).emailInputLocator.fill(userEmail);
  await getRegisterPageLocators(page).passwordInputLocator.fill(userPassword);
  await getRegisterPageLocators(page).signUpButtonLocator.click({
    button: 'left',
  });
}
