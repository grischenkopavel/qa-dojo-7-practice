import { test, expect } from "@playwright/test";

test.describe(`Registration`, { tag: ["@register", "@smoke"] }, async () => {
  const {
    EMAIL = "default@email.com",
    USER_NAME = "defaultName",
    PASSWORD = "default_pass",
  } = process.env;
  test(
    "CD-register-0001: Success registration",
    {
      tag: [],
      annotation: {
        type: "description",
        description: "Registration is successful",
      },
    },
    async ({ page, baseURL }) => {
      await page.goto(`/register`);
      await page.locator("[placeholder=Username]").fill(USER_NAME);
      await page
        .locator("[placeholder=Email]")
        .pressSequentially(EMAIL);
      await page
        .locator("[placeholder=Password]")
        .pressSequentially(PASSWORD);
      await page.locator('[class*="btn"]').click({ button: "left" });

      expect(page.locator("[href=/settings]")).toBeVisible({
        timeout: 500,
      });
      expect(page).toHaveURL(`${baseURL}`);
    }
  );

  test(
    "CD-register-0002: Cannot register an existing user",
    {
      tag: [],
      annotation: {
        type: "description",
        description: "Registration fails in case of existing user",
      },
    },
    async ({ page, baseURL }) => {
      await page.goto("register");
      await page.locator("[placeholder=Username]").fill(USER_NAME);
      await page
        .locator("[placeholder=Email]")
        .pressSequentially(EMAIL);
      await page
        .locator("[placeholder=Password]")
        .pressSequentially(PASSWORD);
      await page.locator('[class*="btn"]').click({ button: "left" });

      expect(
        page
          .locator("[class~=error-messages] > li")
          .filter({ hasText: "username is already taken" })
      ).toBeVisible();
    
      expect(
        page.locator('[class~="error-messages"] > li').filter({
          hasText: "email is already taken.",
        })
      ).toBeVisible();
      expect(page).toHaveURL(`${baseURL}register`);
    }
  );
  test(
    "CD-register-0003: 'Have an account' link redirection",
    {
      tag: [],
      annotation: {
        type: "description",
        description: "'Have an account' link redirects to 'Sign in' form",
      },
    },
    async ({ page, baseURL }) => {
      await page.goto("register");
      await page
        .locator('[class*=text-xs-center] > [href ~= "/login"]')
        .click({ clickCount: 1 });
      expect(
        page.locator('[class*=text-xs-center] > [href ~= "/register"]')
      ).toBeVisible();
      expect(
        page.locator('[class*=auth-page] [class ~= "text-xs-center"]', {
          hasText: "Sign in",
        })
      ).toBeVisible();
      expect(page).toHaveURL(`${baseURL}login`);
    }
  );
});
