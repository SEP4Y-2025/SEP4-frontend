
// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('addPlantType', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Greenhouse #').click();
  await page.getByRole('button', { name: 'Add new type' }).click();
  await page.getByRole('textbox', { name: 'Type' }).click();
  await page.getByRole('textbox', { name: 'Type' }).fill('Mint');
  await page.getByRole('spinbutton', { name: 'Watering frequency' }).click();
  await page.getByRole('spinbutton', { name: 'Watering frequency' }).fill('12');
  await page.getByRole('spinbutton', { name: 'Dosage' }).click();
  await page.getByRole('spinbutton', { name: 'Dosage' }).fill('23');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Type: Mint (12x/week, 23ml)')).toBeVisible();

});