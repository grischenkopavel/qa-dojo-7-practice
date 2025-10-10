import { test, expect } from "@playwright/test";

test(
  "CoffeeCard-0001. Initial total is zero",
  {
    tag: ["@sanity"],
    annotation: {
      type: "description",
      description: "Initial total should be 'Total: $0.00' and cart (0)",
    },
  },
  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      "Total: $0.00"
    );
    await expect(page.getByLabel("Cart page")).toContainText("cart (0)");
  }
);

test(
  "CoffeeCard-0002. Order espresso should be success",
  {
    tag: ["@positive"],
    annotation: {
      type: "description",
      description:
        "Order espresso should be success. 'Thanks for your purchase' message appears",
    },
  },
  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole("textbox", { name: "Name" }).fill("pavlo");
    await page.getByRole("textbox", { name: "Email" }).fill("test@om.com");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByRole("button", { name: "Thanks for your purchase." })
    ).toBeVisible();
  }
);

test.fixme(
  "CoffeeCard-0003. Cannot order with empty checkout",
  {
    tag: ["@negative"],
    annotation: {
      type: "description",
      description:
        "'Thanks for your purchase' message should not appear if checkout is empty",
    },
  },
  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole("textbox", { name: "Name" }).fill("pavlo");
    await page.getByRole("textbox", { name: "Email" }).fill("test@om.com");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByRole("button", { name: "Thanks for your purchase." })
    ).toBeHidden({timeout: 50});
  }
);

test(
  "CoffeeCard-0004. Card. Add logic check",
  {
    tag: ["@positive", "@smoke"],
    annotation: {
      type: "description",
      description: "Card. Add one more Flat White. Total price = $36.00",
    },
  },
  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");

    await page.locator('[data-test="Flat_White"]').click();
    await page.getByRole("link", { name: "Cart page" }).click();

    await page.getByRole("button", { name: "Add one Flat White" }).click();

    await expect(page.locator("#app")).toContainText("$36.00");
  }
);

test(
  "CoffeeCard-0005. Card. Promotion message is visible",
  {
    tag: ["@positive"],
    annotation: {
      type: "description",
      description: "Promotion message is visible on card",
    },
  },
  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Americano"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.getByLabel("Promotion message")).toBeVisible();
  }
);
