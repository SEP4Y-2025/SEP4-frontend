

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('getPlantsByEnvironment', async ({ page }) => {
   await page.goto(`${BASE_URL}/`);

  await page.getByPlaceholder('Enter email').fill('Allan');
  await page.getByPlaceholder('Enter password').fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByText(/680f8359688cb5341f9f9c19/).click();

  await expect(page.getByRole('heading', { name: /My Plants/i })).toBeVisible();

  await expect(page.getByText(/Type: Rose \(x\/week, 50ml\)/)).toBeVisible();

  await expect(page.locator('.sc-dKREkF > div:nth-child(3) > div:nth-child(2)')).toBeVisible();

});