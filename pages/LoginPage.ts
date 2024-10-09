import { test, expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export default class LoginPage extends BasePage {
    private emailInput: Locator;
    private passwordInput: Locator;
    private signInButton: Locator;
    
    constructor(page: Page) {
        super(page);
        this.emailInput = this.page.locator('input[type="email"]');
        this.passwordInput = this.page.locator('input[type="password"]');
        this.signInButton = this.page.locator('button');
    }

    async navigateToSignUp(page) {
        await page.goto('/login')
    }
    async loginIn(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}