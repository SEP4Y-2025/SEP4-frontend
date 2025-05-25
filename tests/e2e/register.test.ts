import { test, expect } from '@playwright/test';

const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';

test('register', async ({ page, browserName }) => {
  const randomNumber = Math.floor(Math.random() * 1000); 
  const username = `kasia${randomNumber}`;
  const email = `kasia${randomNumber}@domain.com`;
  const password = 'password123';

  console.log(`Registering user ${username} with email ${email} in ${browserName}`);

  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill(username);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Repeat email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('textbox', { name: 'Repeat password' }).fill(password);
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('User created successfully')).toBeVisible();
});