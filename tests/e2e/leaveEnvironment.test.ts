

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

/*
test('leaveEnvironment', async ({ page }) => {
  await page.goto(`http://plantandgo-frontend.northeurope.azurecontainer.io/?fbclid=IwY2xjawKe_0xleHRuA2FlbQIxMABicmlkETFKS2xib1hzdDNYeWF0dlg3AR4jZxdoNXjh0hEAYrOA85Mki00x6olMEOnceavb5Erdr-xfzmRv1pkrWIm7MA_aem_00PluytVi5_S8RD0UjTHyA`);
 await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Greenhouse #').click();
  await page.getByRole('button', { name: 'Manage Assistants' }).click();
  await page.getByRole('button', { name: 'Add assistants' }).click();
  await page.getByRole('textbox', { name: 'Assistant Email' }).click();
  await page.getByRole('textbox', { name: 'Assistant Email' }).fill('email2@domain.com');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('rowheader', { name: 'email2@domain.com' }).click();
  await page.getByRole('button', { name: 'Remove' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email2@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password2');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Greenhouse #1X')).toBeVisible();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'X' }).click();

});

*/