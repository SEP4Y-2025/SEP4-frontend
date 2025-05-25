

const baseUrl = 'http://plantandgo-frontend.northeurope.azurecontainer.io';

const email = 'email4@domain.com';
const password = 'password4';

test('viewAirTemperature', async ({ page }) => {
   await page.goto(baseUrl);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Bathroom').click();
  await page.getByRole('button', { name: 'Plant Icon pot3Test' }).click();

    await expect(page.getByText('Namepot3Test')).toBeVisible();
  await expect(page.getByText('Type DetailsTulip')).toBeVisible();
await expect(page.getByText('Light Intensity:')).toBeVisible();


   await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
});