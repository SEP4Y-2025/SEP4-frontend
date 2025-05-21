

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('addPlant', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Greenhouse #').click();
  await page.locator('div').filter({ hasText: /^Type: Rose /}).getByLabel('Add plant').click();
  await page.getByRole('textbox', { name: 'Enter device ID' }).click();
  await page.getByRole('textbox', { name: 'Enter device ID' }).fill('pot_2');
  await page.getByRole('textbox', { name: 'Enter plant name' }).click();
  await page.getByRole('textbox', { name: 'Enter plant name' }).fill('Plant1');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('button', { name: 'Plant Icon Plant1' })).toBeVisible();

});