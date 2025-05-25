

//DONE
import { defineConfig, test, expect } from '@playwright/test';


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export default defineConfig({
  
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // default
});

test('login', async ({ page }) => {
  await page.goto(`http://plantandgo-frontend.northeurope.azurecontainer.io/?fbclid=IwY2xjawKe_0xleHRuA2FlbQIxMABicmlkETFKS2xib1hzdDNYeWF0dlg3AR4jZxdoNXjh0hEAYrOA85Mki00x6olMEOnceavb5Erdr-xfzmRv1pkrWIm7MA_aem_00PluytVi5_S8RD0UjTHyA`);
 await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByPlaceholder('Enter email').fill('email4@domain.com');
  await page.getByPlaceholder('Enter password').fill('password4');
  await page.getByRole('button', { name: 'Log in' }).click();
   await page.getByRole('button', { name: 'close' }).click();
  await expect(page.getByText('Login successful')).toBeVisible();
 
});