import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 25 * 1000,
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: "75%",
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    screenshot: { mode: "only-on-failure", fullPage: true },
    video: "retain-on-failure",
    actionTimeout: 20 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "coffee-cart",
      testDir: "./tests/coffee-cart",
      use: {
        baseURL: process.env.COFFEE_CART_BASE_URL || "https://coffee-cart.app",
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: `conduit`,
      testDir: "./tests/conduit",
      use: {
        baseURL:
          process.env.CONDUIT_BASE_URL || "https://demo.learnwebdriverio.com",
      },
    },
    {
      name: `aria-attributes`,
      testDir: "./tests/aria-attributes",
      use: {},
    },
    {
      name: `demo-qa`,
      testDir: "./tests/demo-qa",
      use: {
        baseURL: "https://demoqa.com",
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
