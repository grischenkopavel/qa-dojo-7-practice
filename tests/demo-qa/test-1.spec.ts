import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.getByRole('button', { name: 'Select picture' }).click();
  await page.getByRole('button', { name: 'Select picture' }).setInputFiles('API-and-UI-Together.png');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
});