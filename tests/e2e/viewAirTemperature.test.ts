

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('viewAirTemperature', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Greenhouse #').click();
  await page.getByRole('button', { name: 'Plant Icon pot4' }).click();

    await expect(page.getByText('Namepot4')).toBeVisible();
    await expect(page.getByText('Type DetailsTulip')).toBeVisible();
    await expect(page.getByText('Temperature:')).toBeVisible();
    await expect(page.getByText('Air Humidity:')).toBeVisible();
 
   await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
});