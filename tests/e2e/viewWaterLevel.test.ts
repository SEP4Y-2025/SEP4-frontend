

// playwright.config.ts
import { defineConfig, test, expect } from '@playwright/test';

export default defineConfig({
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('viewWaterLevel', async ({ page }) => {
  await page.goto(`http://plantandgo-frontend.northeurope.azurecontainer.io/?fbclid=IwY2xjawKe_0xleHRuA2FlbQIxMABicmlkETFKS2xib1hzdDNYeWF0dlg3AR4jZxdoNXjh0hEAYrOA85Mki00x6olMEOnceavb5Erdr-xfzmRv1pkrWIm7MA_aem_00PluytVi5_S8RD0UjTHyA`);
await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('email4@domain.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('password4');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Bathroom').click();
  await page.getByRole('button', { name: 'Plant Icon pot1' }).click();

  await expect(page.getByText('Namepot1')).toBeVisible();
  await expect(page.getByText('Type DetailsMint')).toBeVisible();
 
  await expect(page.getByRole('heading', { name: 'Current Soil Humidity for ' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Water Tank Status' })).toBeVisible();
  await expect(page.getByText('Current Level')).toBeVisible();
  await expect(page.getByText('Total Capacity')).toBeVisible();
  await expect(page.getByText('StatusGood')).toBeVisible();

   await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
});