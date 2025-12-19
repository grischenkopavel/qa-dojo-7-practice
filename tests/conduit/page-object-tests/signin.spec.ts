import { test, expect } from '@playwright/test';
import { SignIn } from '../../../app/conduit/ui/SignInPage';
import { HomePage } from '../../../app/conduit/ui/HomePage';
import { SettingsPage } from '../../../app/conduit/ui/SettingsPage';
import { LoggedOutPage } from '../../../app/conduit/ui/LoggedOutPage/LoggedOutPage';

test.describe(`Login`, { tag: ['@login', '@smoke'] }, async () => {
  test(
    'CD-login-0001: Success login',
    {
      tag: [],
      annotation: {
        type: 'description',
        description: 'Login is successful',
      },
    },
    async ({ page }) => {
      const loggedOutPage: LoggedOutPage = new LoggedOutPage(page);
      const signInPage: SignIn = new SignIn(page);
      const homePage: HomePage = new HomePage(page);
      await page.goto(`/`);
      await loggedOutPage.clickSignInLink();
      await signInPage.signIn(process.env.EMAIL!, process.env.PASSWORD!);

      await expect(await homePage.getSettingsLink()).toContainText('Settings');
      await expect(await homePage.getNewArticleLink()).toBeVisible();
    }
  );

  test(
    'CD-login-0002: Logout',
    {
      tag: [],
      annotation: {
        type: 'description',
        description: 'Logout is successful',
      },
    },
    async ({ page }) => {
      const loggedOutPage: LoggedOutPage = new LoggedOutPage(page);
      const signInPage: SignIn = new SignIn(page);
      const settingsPage: SettingsPage = new SettingsPage(page);
      const homePage: HomePage = new HomePage(page);

      await page.goto(`/`);
      await loggedOutPage.clickSignInLink();
      await signInPage.signIn(process.env.EMAIL!, process.env.PASSWORD!);
      
      await expect(await homePage.getSettingsLink()).toContainText('Settings');

      await homePage.clickSettingsLink();
      await settingsPage.clickLogoutButton();

      await expect(await loggedOutPage.getSignInLink()).toBeVisible();
      await expect(await loggedOutPage.getSignUpLink()).toBeVisible();
    }
  );
});
