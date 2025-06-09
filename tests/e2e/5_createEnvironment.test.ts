

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], 
   timeout: 60000, 
});
const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
const email = 'email4@domain.com';
const password = 'password4';
test('createEnvironment', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'This test only runs on chromium');
  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Add new' }).click();
  await page.getByRole('textbox', { name: 'Environment Name' }).click();
  await page.getByRole('textbox', { name: 'Environment Name' }).fill('Kitchen');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await expect(page.getByText('Kitchen')).toBeVisible();

});