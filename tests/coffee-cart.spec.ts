import { test, expect, Locator } from '@playwright/test';
import { beforeEach } from 'node:test';

test.describe('Test coffee cart site', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://coffee-cart.app/");
    })
    test('Check the cart is empty', async ({ page }) => {
       let cartPage: Locator = page.locator('[aria-label="Cart page"]');
       await cartPage.click();
       await expect(page.locator('.list p')).toContainText('No coffee, go add some.');
    })
    
    test('Add item to the cart', async ({ page }) => {
        let espresso: Locator = page.locator('div[data-test="Espresso"]');
        await espresso.click();
        await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $10.00');
        await page.locator('[aria-label="Cart page"]').click();
        await expect(page.locator('div.list>div>ul li.list-item')).toBeVisible();
    })
    test('Delete item from the cart', async ({ page }) => {
        let espresso: Locator = page.locator('div[data-test="Espresso"]');
        await espresso.click();
        await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $10.00');
        await page.locator('[aria-label="Cart page"]').click();
        let deleteButton: Locator = page.locator('button.delete');
        await deleteButton.click();
        await expect(page.locator('.list p')).toContainText('No coffee, go add some.');
    });
    
    test('Add multiple items to the cart', async ({ page }) => {
        let espresso: Locator = page.locator('div[data-test="Espresso"]');
        let cappuccino: Locator = page.locator('div[data-test="Cappuccino"]');
        await espresso.click();
        await cappuccino.click();
        await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $29.00');
    })
    
    test('Add one more item to the cart via cart preview', async ({ page }) => {
        let espresso: Locator = page.locator('div[data-test="Espresso"]');
        let cappuccino = page.locator('div[data-test="Cappuccino"]');
        await espresso.click();
        await cappuccino.click();
        await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $29.00');
        await page.locator('[data-test="checkout"]').hover();
        let addCappuccinoButton = page.locator('.unit-controller button[aria-label="Add one Cappuccino"]');
        await addCappuccinoButton.click();
        await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $48.00');
    })
    
    test('Submit form of Payment details', async ({ page }) => {
        let espresso: Locator = page.locator('div[data-test="Espresso"]');
        await espresso.click();
        await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $10.00');
        await page.locator('[data-test="checkout"]').click();
        await expect(page.locator('div.modal')).toBeVisible();
        let nameField: Locator = page.locator('input#name');
        let emailField: Locator = page.locator('input#email');
        let submitButton: Locator = page.locator('#submit-payment');
        // function:
        async function fillInput(element: Locator, input: string) {
            await element.fill(input);
        };
        await fillInput(nameField, 'Test');
        await fillInput(emailField, 'test-email@test.com');

        // await nameField.fill('Test');
        // await emailField.fill('test-email@test.com');
        
        await submitButton.click();
        await expect(page.locator('.snackbar.success')).toBeVisible();
        await expect(page.locator('.snackbar.success')).toContainText('Thanks for your purchase. Please check your email for payment.');
    })
})