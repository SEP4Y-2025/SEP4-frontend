import { test } from '@playwright/test';
const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';
const email = 'email4@domain.com';
const password = 'password4';

 test('addPlant', async ({ page, browserName }) => {

    test.skip(browserName !== 'chromium', 'This test only runs on webkit');
  await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByText('Bathroom').click();
    await page.getByRole('button', { name: 'Add plant' }).nth(1).click();
    await page.getByPlaceholder('Enter device ID').fill("pot_2");
    await page.getByPlaceholder('Enter plant name').fill('pot2Test');
    await page.getByRole('button', { name: 'Save' }).click();

  });


