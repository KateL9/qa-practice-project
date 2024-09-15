import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'API' }).click();
  await page.getByRole('button', { name: 'Test Runner' }).click();
  await page.getByRole('button', { name: 'Test Runner' }).click();
});

test('test 1', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').fill('loca');
  await page.getByRole('link', { name: 'Locators', exact: true }).click();
  await page.getByRole('link', { name: 'Locate by alt text', exact: true }).click();
  await page.getByRole('link', { name: 'Count items in a list', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'More LocatorsDirect link to' })).toBeVisible();
});

test('test 2', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/writing-tests');
  await page.getByRole('button', { name: 'Playwright Test' }).click();
  await page.getByRole('button', { name: 'Guides' }).click();
  await expect(page.getByRole('link', { name: 'Next Generating tests »' })).toBeVisible();
  await page.getByRole('link', { name: 'Next Generating tests »' }).click();
  await page.locator('body').press('ControlOrMeta+c');
  await expect(page.locator('h1')).toContainText('Generating tests');
});

