import { test, expect, Locator } from '@playwright/test';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

test('Sign up from Home page', async ({ page }) => {
  let homePage = new HomePage(page);
  await homePage.navigateTo('/');
  await homePage.clickSignUpButton();
  
  let signUpPage = new SignUpPage(page);
  let random: number = Math.floor(Math.random() * 1000);
  let username = `testuser${random}`;
  await signUpPage.signUp(username, `@${username}@gmail.com`, 'Password1!');
  await expect(homePage.newArticleButton).toBeVisible();
});

test('Login from Home page', async ({ page }) => {
  let homePage = new HomePage(page);
  await homePage.navigateTo('/');
  await homePage.clickLoginButton();
  
  let loginPage = new LoginPage(page);
  let email = 'test@gmail.com';
  let password = 'Password1!';
  await loginPage.loginIn(email, password);
  await expect(homePage.newArticleButton).toBeVisible();
});

test('login, create an article, the article is created', async ({page}) => {
  
  // Login 
  await page.goto('https://demo.learnwebdriverio.com/login');
  let username: string = 'test@gmail.com';
  let password: string = 'Password1!';
  let usernameField: Locator = page.locator('//input[@type="email"]');
  let passwordField: Locator = page.locator('//input[@type="password"]');
  let signInButton: Locator = page.locator('//button[contains(text(), "Sign in")]');


  await usernameField.fill(username);
  await passwordField.fill(password);
  await signInButton.click();

  let usernameSign: Locator = page.locator('//a[contains(text(), "test")]');
  await expect(usernameSign).toBeVisible();

  // Create an article
  await page.goto('https://demo.learnwebdriverio.com/editor');
  
  let articleTitleField: Locator = page.locator('//input[@data-qa-id="editor-title"]');
  let articleDescriptionField: Locator = page.locator('//input[@data-qa-id="editor-description"]');
  let articleMarkdownField: Locator = page.locator('//textarea[contains(@class, "auto-textarea-input")]');
  let articleTagField: Locator = page.locator('//input[@data-qa-id="editor-tags"]');
  let publishButton: Locator = page.locator('//button[@data-qa-id="editor-publish"]');
  
  let articleTitle: Locator = page.locator('//h1[@data-qa-id="article-title"]');
  let testTitle: string = 'Test Article Title';
  await articleTitleField.fill(testTitle);
  await articleDescriptionField.fill('Test Article Description');
  await articleMarkdownField.fill('Test Article Markdown');
  await articleTagField.fill('Test Article Tag');
  await publishButton.click();

  await expect(articleTitle).toContainText(testTitle);
});
