import { test, expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export default class SignUpPage extends BasePage {
    private userNameInput: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private signUpButton: Locator;


    constructor(page: Page) {
        super(page);
        this.userNameInput = this.page.locator('input[placeholder="Username"]');
        this.emailInput = this.page.locator('input[placeholder="Email"]');
        this.passwordInput = this.page.locator('input[placeholder="Password"]');
        this.signUpButton = this.page.locator('button');
    }

    async navigateToSignUp(page) {
        await page.goto('/register')
    }

    async signUp(username: string, email: string, password: string) {
        await this.userNameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signUpButton.click();
    }
}