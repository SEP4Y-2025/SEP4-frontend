

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';


export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';

const email = 'email4@domain.com';
const password = 'password4';

test('viewWaterLevel', async ({ page }) => {
  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Bathroom').click();
  await page.getByRole('button', { name: 'Plant Icon pot3Test' }).click();

  await expect(page.getByText('Namepot3Test')).toBeVisible();
  await expect(page.getByText('Type DetailsDaisy')).toBeVisible();
 
  await expect(page.getByRole('heading', { name: 'Current Soil Humidity for ' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Water Tank Status' })).toBeVisible();
  await expect(page.getByText('Current Level')).toBeVisible();
  await expect(page.getByText('Total Capacity')).toBeVisible();
  await expect(page.getByText('Status', { exact: true })).toBeVisible();

   await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
});