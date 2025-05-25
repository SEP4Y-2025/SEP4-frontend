import { test, expect } from '@playwright/test';

const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';

const email = 'email4@domain.com';
const password = 'password4';

const pots = ['pot_1', 'pot_2', 'pot_3'];

pots.forEach((potId, index) => {
  test(`create ${potId}`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(baseUrl);
    await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Enter email' }).click();
    await page.getByPlaceholder('Enter email').fill(email);
      await page.getByRole('textbox', { name: 'Enter password' }).click();
    await page.getByPlaceholder('Enter password').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.getByText('Bathroom').click();
     await page.getByRole('button', { name: 'Add plant' }).nth(1).click();

    await page.getByPlaceholder('Enter device ID').fill(potId);
    await page.getByPlaceholder('Enter plant name').fill(potId + 'Test');
    await page.getByRole('button', { name: 'Save' }).click();


    await context.close();
  });
});

