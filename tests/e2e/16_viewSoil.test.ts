

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';


export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], 
  // default
  timeout: 60000
});

const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
const email = 'email4@domain.com';
const password = 'password4';
test('viewSoil', async ({ page }) => {
  await page.goto(baseUrl, { timeout: 15000 });
  await page.getByRole('button', { name: 'Log in' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Bathroom').click();
  await page.getByRole('button', { name: 'Plant Icon pot3Test' }).click();
  await expect(page.getByText('Namepot3Test')).toBeVisible();
  await expect(page.getByText('Type DetailsMint')).toBeVisible();
  await expect(page.getByText('Soil Humidity:')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
});