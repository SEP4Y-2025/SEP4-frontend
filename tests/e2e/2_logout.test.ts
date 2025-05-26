

// DONE
import { defineConfig, test, expect } from '@playwright/test';
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});
const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
test('logOut', async ({ page }) => {
   await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
   await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email4@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password4');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Profile' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
});