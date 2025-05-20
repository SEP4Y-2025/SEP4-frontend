

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('changePassword', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
   await page.getByRole('button', { name: 'close' }).click();

  await expect(page.getByText('Greenhouse #')).toBeVisible();
   await page.getByRole('button', { name: 'Profile' }).click();
  await page.getByRole('button', { name: 'Change Password' }).click();
  await page.getByRole('textbox', { name: 'Old Password' }).click();
  await page.getByRole('textbox', { name: 'Old Password' }).fill('password1');
  await page.getByRole('textbox', { name: 'New Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'New Password', exact: true }).fill('password12');
  await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('password12');
  await page.getByRole('button', { name: 'Change', exact: true }).click();
  await page.getByText('Password changed successfully').click();
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
});