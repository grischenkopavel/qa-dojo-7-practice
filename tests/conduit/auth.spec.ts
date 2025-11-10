import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {
  getRegisterPageLocators,
  createUser,
} from '../../app/conduit/ui/users.ts';

test.describe(`Registration`, { tag: ['@register', '@smoke'] }, async () => {
  const {
    EMAIL = 'default@email.com',
    USER_NAME = 'defaultName',
    PASSWORD = 'default_pass',
  } = process.env;
  test(
    'CD-register-0001: Success registration',
    {
      tag: [],
      annotation: {
        type: 'description',
        description: 'Registration is successful {faker user}',
      },
    },
    async ({ page, baseURL }) => {
      const userName = faker.person.firstName();
      const userEmail = faker.internet.email({ firstName: userName });
      const userPassword = faker.internet.password({ length: 5 });

      await page.goto(`/register`);
      await page.locator('[placeholder=Username]').fill(userName);
      await page.locator('[placeholder=Email]').pressSequentially(userEmail);
      await page
        .locator('[placeholder=Password]')
        .pressSequentially(userPassword);
      await page.locator('[class*="btn"]').click({ button: 'left' });

      await expect(
        page.getByRole('link', { name: '  Settings' })
      ).toContainText('Settings');
      await expect(
        page.getByRole('link', { name: `${userName}` })
      ).toContainText(userName, { ignoreCase: true });
      await expect(page).toHaveURL(`${baseURL}`);
    }
  );

  test(
    'CD-register-0002: Cannot register an existing user',
    {
      tag: [],
      annotation: {
        type: 'description',
        description: 'Registration fails in case of existing user',
      },
    },
    async ({ page, baseURL }) => {
      await page.goto('register');
      await page.locator('[placeholder=Username]').fill(USER_NAME);
      await page.locator('[placeholder=Email]').pressSequentially(EMAIL);
      await page.locator('[placeholder=Password]').pressSequentially(PASSWORD);
      await page.locator('[class*="btn"]').click({ button: 'left' });

      await expect(
        page
          .locator('[class~=error-messages] > li')
          .filter({ hasText: 'username is already taken.' })
      ).toContainText('username is already taken.');

      await expect(
        page.locator('[class~="error-messages"] > li').filter({
          hasText: 'email is already taken.',
        })
      ).toHaveText('email is already taken.');
      await expect(page).toHaveURL(`${baseURL}/register`);
    }
  );

  test(
    "CD-register-0003: 'Have an account' link redirection",
    {
      tag: [],
      annotation: {
        type: 'description',
        description: "'Have an account' link redirects to 'Sign in' form",
      },
    },
    async ({ page, baseURL }) => {
      await page.goto('register');
      await page
        .locator('[class*=text-xs-center] > [href ~= "/login"]')
        .click({ clickCount: 1 });
      await expect(
        page.locator('[class*=text-xs-center] > [href ~= "/register"]')
      ).toBeVisible();
      await expect(
        page.locator('[class*=auth-page] [class ~= "text-xs-center"]', {
          hasText: 'Sign in',
        })
      ).toBeVisible();
      await expect(page).toHaveURL(`${baseURL}/login`);
    }
  );

  test('CD-register-0004: Create new user with users.ts', async ({ page }) => {
    createUser(page, USER_NAME, EMAIL, PASSWORD);

    await expect(page.getByRole('link', { name: 'Settings' })).toContainText(
      'Settings'
    );
    await expect(
      page.getByRole('link', { name: `${USER_NAME}` })
    ).toContainText(USER_NAME, { ignoreCase: true });
  });
});
