
// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
  use: {
    video: 'on', 
  },
});
const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
const email = 'email4@domain.com';
const password = 'password4';
test('addPlantType', async ({ page }) => {
  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Bathroom').click();
  await page.getByRole('button', { name: 'Add new type' }).click();
  await page.getByRole('textbox', { name: 'Type' }).click();
  await page.getByRole('textbox', { name: 'Type' }).fill('Daisy');
  await page.getByRole('spinbutton', { name: 'Watering frequency' }).click();
  await page.getByRole('spinbutton', { name: 'Watering frequency' }).fill('12');
  await page.getByRole('spinbutton', { name: 'Dosage' }).click();
  await page.getByRole('spinbutton', { name: 'Dosage' }).fill('23');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Type: Daisy (12x/week, 23ml)')).toBeVisible();
});