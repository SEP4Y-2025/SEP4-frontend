

// DONE
import { defineConfig, test, expect } from '@playwright/test';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('logOut', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Profile' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
});