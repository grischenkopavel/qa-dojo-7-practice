import { test, expect } from '@playwright/test';
import { SignUp } from '../../../app/conduit/ui/SignUpPage';
import { HomePage } from '../../../app/conduit/ui/HomePage';
import { LoggedOutPage } from '../../../app/conduit/ui/LoggedOutPage/LoggedOutPage';

test.describe(`Registration`, { tag: ['@register', '@smoke'] }, async () => {
  test(
    'CD-register-0001: Success registration',
    {
      tag: [],
      annotation: {
        type: 'description',
        description: 'Registration is successful',
      },
    },
    async ({ page }) => {
      const loggedOutPage: LoggedOutPage = new LoggedOutPage(page);
      const signUpPage: SignUp = new SignUp(page);
      const homePage: HomePage = new HomePage(page);

      await page.goto('/');
      await loggedOutPage.clickSignUpLink();
      //TODO replace with faker data
      await signUpPage.signUp(
        process.env.USERNAME!,
        process.env.EMAIL!,
        process.env.PASSWORD!
      );

      await expect(await homePage.getSettingsLink()).toContainText('Settings');
      await expect(await homePage.getNewArticleLink()).toBeVisible();
      await expect(
        page.getByRole('link', { name: `${process.env.USERNAME!}` })
      ).toContainText(process.env.USERNAME!, { ignoreCase: true });
    }
  );
});
