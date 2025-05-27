

import { defineConfig, test, expect } from '@playwright/test';


export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  timeout: 60000
});
const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
const email = 'email4@domain.com';
const password = 'password4';
test('viewListAssinsts', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'This test only runs on chromium');
  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Bathroom').click();
  await page.getByRole('button', { name: 'Manage Assistants' }).click();
  await page.getByRole('button', { name: 'Add assistants' }).click();
  await page.getByRole('textbox', { name: 'Assistant Email' }).click();
  await page.getByRole('textbox', { name: 'Assistant Email' }).fill('email2@domain.com');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await expect(page.getByRole('rowheader', { name: 'email2@domain.com' })).toBeVisible({ timeout: 30000 });
});
