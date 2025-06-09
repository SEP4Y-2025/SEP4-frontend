

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], 
  timeout: 60000
});


const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
const email = 'email4@domain.com';
const password = 'password4';
test('changePassword', async ({ page , browserName}) => {
  test.skip(browserName !== 'chromium', 'This test only runs on chromium');
 
  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Profile' }).click();
  await page.getByRole('button', { name: 'Change Password' }).click();
  await page.getByRole('textbox', { name: 'Old Password' }).click();
  await page.getByRole('textbox', { name: 'Old Password' }).fill('password4');
  await page.getByRole('textbox', { name: 'New Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'New Password', exact: true }).fill('password12');
  await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('password12');
  await page.getByRole('button', { name: 'Change', exact: true }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email4@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password12');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Profile' }).click();
  await page.getByRole('button', { name: 'Change Password' }).click();
  await page.getByRole('textbox', { name: 'Old Password' }).click();
  await page.getByRole('textbox', { name: 'Old Password' }).fill('password12');
  await page.getByRole('textbox', { name: 'New Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'New Password', exact: true }).fill('password4');
  await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('password4');
  await page.getByRole('button', { name: 'Change', exact: true }).click();
  await page.getByRole('button', { name: 'close' }).click();

});