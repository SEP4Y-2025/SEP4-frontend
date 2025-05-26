
import { defineConfig, test, expect } from '@playwright/test';

export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
test('login', async ({ page }) => {
  
  await page.goto(baseUrl);
 await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByPlaceholder('Enter email').fill('email4@domain.com');
  await page.getByPlaceholder('Enter password').fill('password4');
  await page.getByRole('button', { name: 'Log in' }).click();
   await page.getByRole('button', { name: 'close' }).click();
  await expect(page.getByText('Login successful')).toBeVisible();
 
});