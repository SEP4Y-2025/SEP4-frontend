
// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
})
const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
const email = 'email4@domain.com';
const password = 'password4';
test('deletePlant', async ({ page, browserName }) => {
  test.skip(browserName !== 'webkit', 'This test only runs on webkit');
  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Bathroom').click();
  await page.getByRole('button', { name: 'Plant Icon pot3Test' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete pot3Test' }).click();
});