

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('register', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);

  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill('kasia');
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('kasia@domai.com');
  await page.getByRole('textbox', { name: 'Enter email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter email' }).fill('kasia@domain.com');
  await page.getByRole('textbox', { name: 'Repeat email' }).click();
  await page.getByRole('textbox', { name: 'Repeat email' }).fill('kasia@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('123');
  await page.getByRole('textbox', { name: 'Repeat password' }).click();
  await page.getByRole('textbox', { name: 'Repeat password' }).fill('123');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('User created successfully')).toBeVisible();

});