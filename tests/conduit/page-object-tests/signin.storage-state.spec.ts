import { test, expect } from '@playwright/test';
import { SignIn } from '../../../app/conduit/ui/SignInPage';
import { HomePage } from '../../../app/conduit/ui/HomePage';
import { SettingsPage } from '../../../app/conduit/ui/SettingsPage';
import { LoggedOutPage } from '../../../app/conduit/ui/LoggedOutPage/LoggedOutPage';

test.describe(`Login-Logout`, { tag: ['@login', '@smoke'] }, async () => {

  test.use({ storageState: './storageState.json' });

  test(
    'CD-login-0002: Success login with storage state',
    {
      tag: [],
      annotation: {
        type: 'description',
        description: 'Login is successful with storage state',
      },
    },
    async ({ page }) => {
      const homePage: HomePage = new HomePage(page);
      await page.goto(`/`);

      await expect(await homePage.getSettingsLink()).toContainText('Settings');
      await expect(await homePage.getNewArticleLink()).toBeVisible();
    }
  );

  test(
    'CD-login-0003: Logout',
    {
      tag: [],
      annotation: {
        type: 'description',
        description: 'Logout is successful',
      },
    },
    async ({ page }) => {
      const settingsPage: SettingsPage = new SettingsPage(page);
      const homePage: HomePage = new HomePage(page);
      const loggedOutPage: LoggedOutPage = new LoggedOutPage(page);

      await page.goto(`/`);
      await homePage.clickSettingsLink();
      await settingsPage.clickLogoutButton();

      await expect(await loggedOutPage.getSignInLink()).toBeVisible();
      await expect(await loggedOutPage.getSignUpLink()).toBeVisible();
    }
  );
});
