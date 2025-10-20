import { test, expect } from "@playwright/test";

test.describe(`Login`, { tag: ["@login", "@smoke"] }, async () => {
  const {
    EMAIL = "default@email.com",
    USER_NAME = "defaultName",
    PASSWORD = "default_pass",
  } = process.env;
  test(
    "CD-login-0001: Success login",
    {
      tag: [],
      annotation: {
        type: "description",
        description: "Login is successful",
      },
    },
    async ({ page, baseURL }) => {
      await page.goto(`/login`);
      await page.locator("[placeholder=Email]").fill(EMAIL);
      await page.locator("[placeholder=Password]").fill(PASSWORD);

      await page
        .locator('[class*="btn"]')
        .filter({ hasText: "Sign in" })
        .click({ button: "left" });

      await expect(page).toHaveURL(`${baseURL}`);
      await expect(page.locator('[href="/editor"]')).toBeVisible();
    }
  );
  test(
    "CD-login-0002: Logout",
    {
      tag: [],
      annotation: {
        type: "description",
        description: "Logout is successful",
      },
    },
    async ({ page, baseURL }) => {
      await page.goto(`/login`);
      await page.locator("[placeholder=Email]").fill(EMAIL);
      await page.locator("[placeholder=Password]").fill(PASSWORD);

      await page
        .locator('[class*="btn"]')
        .filter({ hasText: "Sign in" })
        .click({ button: "left" });

      await page.locator('[href="/settings"]').click();

      await expect(page).toHaveURL(`${baseURL}/settings`);

      await page
        .locator("[class*=btn]")
        .filter({ hasText: "Or click here to logout" })
        .click();

      await expect(
        page.locator('[href="/login"]').filter({ hasText: "Sign in" })
      ).toContainText("Sign in");
      await expect(page.getByRole("link", { name: " Sign up" })).toContainText(
        "Sign up"
      );
    }
  );
  test(
    "CD-login-0003: Attempt to login with empty credentials",
    {
      tag: [],
      annotation: {
        type: "description",
        description:
          "Warning messages appear in case of attempt to login with empty credentials",
      },
    },
    async ({ page }) => {
      await page.goto(`/login`);
      await page
        .locator('[class*="btn"]')
        .filter({ hasText: "Sign in" })
        .click({ button: "left" });

      await expect(
        page
          .locator("[class~=error-messages] > li")
          .filter({ hasText: "email can't be blank" })
      ).toBeVisible();

      await page.reload();
      await page.locator("[placeholder=Email]").fill(EMAIL);
      await page
        .locator('[class*="btn"]')
        .filter({ hasText: "Sign in" })
        .click({ button: "left" });

      await expect(
        page
          .locator("[class~=error-messages] > li")
          .filter({ hasText: "password can't be blank" })
      ).toBeVisible();
    }
  );
});
