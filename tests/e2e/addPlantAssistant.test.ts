

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('addPlantAssistant', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Greenhouse #').click();
  await page.getByRole('button', { name: 'Manage Assistants' }).click();
  await page.getByRole('button', { name: 'Add assistants' }).click();
  await page.getByRole('textbox', { name: 'Assistant Email' }).click();
  await page.getByRole('textbox', { name: 'Assistant Email' }).fill('email2@domain.com');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await expect(page.getByRole('rowheader', { name: 'email2@domain.com' })).toBeVisible();

});