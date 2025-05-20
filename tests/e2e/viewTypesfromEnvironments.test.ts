
// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('viewTypesFromEnvironment', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1');
  await page.getByRole('textbox', { name: 'Enter email' }).press('Shift+CapsLock');
  await page.getByRole('textbox', { name: 'Enter email' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Greenhouse #').click();
  await expect(page.getByText('Type: Rose (2x/week, 50ml)')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^pot4$/ }).nth(1)).toBeVisible();

});