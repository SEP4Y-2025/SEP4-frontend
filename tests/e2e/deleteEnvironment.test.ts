

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('deleteEnvironment', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Add new' }).click();
  await page.getByRole('textbox', { name: 'Environment Name' }).click();
  await page.getByRole('textbox', { name: 'Environment Name' }).fill('Kitchen');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByText('Kitchen').click();
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).click();
});