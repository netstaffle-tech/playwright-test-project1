import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    //Define Variable
    //readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameInput = page.locator("#user-name")
        this.passwordInput = page.locator("#password")
        this.loginButton = page.locator("#login-button")
        this.errorMessage = page.locator('[data-test="error"]')
        this.menuButton = page.locator('#react-burger-menu-btn')
        this.logoutLink = page.locator('#logout_sidebar_link')
    }

    //Verify Login
    async login(username: string, password: string) {
        await this.fill(this.usernameInput, username)
        await this.fill(this.passwordInput, password)
        await this.click(this.loginButton)
    }

    async loginUsingEnter(username: string, password: string) {
        await this.fill(this.usernameInput, username)
        await this.fill(this.passwordInput, password)
        await this.pressKey('Enter')
    }

    //Get Error
    async getErrorMessage() {
        return await this.getText(this.errorMessage);
    }

    //Error Show
    async isErrorVisible() {
        return await this.isVisible(this.errorMessage);
    }

    //verify error
    async verifyError(message: string) {
        await this.verifyText(this.errorMessage, message);
    }

    //Verify Locked User
    async verifyLockedUserError() {
        await this.verifyError('Epic sadface: Sorry, this user has been locked out.');
    }

    async verifyLoginPage() {
        await this.verifyVisible(this.loginButton);
    }

    //Logout
    async logout() {
        await this.click(this.menuButton);
        await this.click(this.logoutLink);
    }
}