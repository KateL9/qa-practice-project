import { test, expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export default class HomePage extends BasePage {
    private LoginButton: Locator;
    private signUpButton: Locator;
    newArticleButton: Locator;

    constructor(page: Page) {
        super(page);
        this.LoginButton = this.page.locator('[data-qa-id="site-nav"] a[href="/login"]');
        this.signUpButton = this.page.locator('[data-qa-id="site-nav"] a[href="/register"]');
        this.newArticleButton = this.page.locator('[data-qa-id="site-nav"] a[href="/editor"]');
    }

    async clickLoginButton() {
        await this.LoginButton.click()
    };
    async clickSignUpButton() {
        await this.signUpButton.click()
    };
}