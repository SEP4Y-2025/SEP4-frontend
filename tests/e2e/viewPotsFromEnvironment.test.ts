

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'
export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('viewPotsFromEnvironment', async ({ page }) => {
  await page.goto(`http://plantandgo-frontend.northeurope.azurecontainer.io/?fbclid=IwY2xjawKe_0xleHRuA2FlbQIxMABicmlkETFKS2xib1hzdDNYeWF0dlg3AR4jZxdoNXjh0hEAYrOA85Mki00x6olMEOnceavb5Erdr-xfzmRv1pkrWIm7MA_aem_00PluytVi5_S8RD0UjTHyA`);
 await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1');
  await page.getByRole('textbox', { name: 'Enter email' }).press('Shift+CapsLock');
  await page.getByRole('textbox', { name: 'Enter email' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email1@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('My Environment')).toBeVisible();
  await page.getByText('Greenhouse #').click();
  await expect(page.getByText('My Plants')).toBeVisible();
  await expect(page.getByText('pot2')).toBeVisible();
  await expect(page.getByText('pot3')).toBeVisible();    
  const button = page.getByRole('button', { name: /pot3/ });
  await expect(button.getByAltText('Plant Icon')).toBeVisible();

});