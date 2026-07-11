import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    //Define Variable
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly error: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
        this.finishButton = page.locator('#finish');
        this.error = page.locator('[data-test="error"]');
    }

    async fillCheckoutInformation(first: string, last: string, zip: string) {
        await this.fill(this.firstName, first);
        await this.fill(this.lastName, last);
        await this.fill(this.postalCode, zip);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async verifyError(message: string) {
        await expect(this.error).toHaveText(message);
    }

    async verifyPaymentInformation() {
        await expect(this.page.locator('.summary_value_label').first()).toBeVisible();
    }

    async verifyShippingInformation() {
        await expect(this.page.locator('.summary_value_label').nth(1)).toBeVisible();
    }

    async verifyItemTotal() {
        await expect(this.page.locator('.summary_subtotal_label')).toBeVisible();
    }

    async verifyTax() {
        await expect(this.page.locator('.summary_tax_label')).toBeVisible();
    }

    async verifyTotal() {
        await expect(this.page.locator('.summary_total_label')).toBeVisible();
    }

    async verifySuccessMessage() {
        await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    }

    async clickBackHome() {
        await this.page.locator('#back-to-products').click();
    }

    async verifyFirstNameField() {
        await expect(this.firstName).toBeVisible();
    }

    async verifyLastNameField() {
        await expect(this.lastName).toBeVisible();
    }

    async verifyPostalCodeField() {
        await expect(this.postalCode).toBeVisible();
    }

    async verifyContinueButton() {
        await expect(this.continueButton).toBeVisible();
    }

    async verifyCancelButton() {
        await expect(this.cancelButton).toBeVisible();
    }

    async verifyErrorIcon() {
        await expect(this.page.locator('.error_icon')).toBeVisible();
    }

    async verifyCheckoutFields() {
        await expect(this.firstName).toBeVisible();
        await expect(this.lastName).toBeVisible();
        await expect(this.postalCode).toBeVisible();
    }

    async verifyCheckoutInformationPage() {
        await expect(this.page).toHaveURL(/checkout-step-one/);
    }
}