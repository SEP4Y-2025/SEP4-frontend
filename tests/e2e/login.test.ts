

//DONE
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export default defineConfig({
  
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('login', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await delay(1000);
  await page.getByPlaceholder('Enter email').fill('email1@domain.com');
  await delay(1000);
  await page.getByPlaceholder('Enter password').fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await delay(2000);
  await expect(page.getByRole('heading', { name: /Select Environment/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /My Environments/i })).toBeVisible();

  await delay(3000);
});