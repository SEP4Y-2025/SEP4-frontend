

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';

const email = 'email4@domain.com';
const password = 'password4';

export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('deletePlantAssistant', async ({ page, browserName }) => {
 test.skip(browserName !== 'webkit', 'This test only runs on webkit');
  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Bathroom').click();
  await page.getByRole('button', { name: 'Manage Assistants' }).click();
  await expect(page.getByRole('rowheader', { name: 'email2@domain.com' })).toBeVisible();
  await page.getByRole('button', { name: 'Remove' }).click();

});