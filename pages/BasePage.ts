import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // =========================
    // Navigation
    // =========================
    async goTo(): Promise<void> {
        await this.page.goto('/');
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async goForward(): Promise<void> {
        await this.page.goForward();
    }

    // =========================
    // Browser
    // =========================

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async closePage(): Promise<void> {
        await this.page.close();
    }

    // =========================
    // Waits
    // =========================

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
    }

    async waitForHidden(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'hidden' });
    }

    // =========================
    // Mouse
    // =========================

    async hover(locator: Locator): Promise<void> {
        await locator.hover();
    }

    async doubleClick(locator: Locator): Promise<void> {
        await locator.dblclick();
    }

    async rightClick(locator: Locator): Promise<void> {
        await locator.click({ button: 'right' });
    }

    // =========================
    // Keyboard
    // =========================

    async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }

    // =========================
    // Scroll
    // =========================

    async scrollToTop(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight)
        );
    }

    async scrollIntoView(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    // =========================
    // Screenshot
    // =========================

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    // =========================
    // Assertions
    // =========================

    async verifyUrl(url: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }

    async verifyTitle(title: string | RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

    async verifyVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async verifyHidden(locator: Locator): Promise<void> {
        await expect(locator).toBeHidden();
    }

    async verifyEnabled(locator: Locator): Promise<void> {
        await expect(locator).toBeEnabled();
    }

    async verifyDisabled(locator: Locator): Promise<void> {
        await expect(locator).toBeDisabled();
    }

    async verifyText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toHaveText(text);
    }

    async verifyContainsText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toContainText(text);
    }

    async verifyCount(locator: Locator, count: number): Promise<void> {
        await expect(locator).toHaveCount(count);
    }

    // =========================
    // Generic Actions
    // =========================

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async clear(locator: Locator): Promise<void> {
        await locator.clear();
    }

    async selectByValue(locator: Locator, value: string): Promise<void> {
        await locator.selectOption(value);
    }

    async check(locator: Locator): Promise<void> {
        await locator.check();
    }

    async uncheck(locator: Locator): Promise<void> {
        await locator.uncheck();
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? '';
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async toBeLessThan(value: number, expectedValue: number): Promise<void> {
        await expect(value).toBeLessThan(expectedValue);
    }
    async waitForURL(url: string) {
        await this.page.waitForURL(url)
    }
}