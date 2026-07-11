import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    //Define Variable
    readonly cartIcon: Locator;
    readonly cartItems: Locator;
    readonly removeButtons: Locator;
    readonly checkoutButton: Locator;
    readonly continueShopping: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartItems = page.locator('.cart_item');
        this.removeButtons = page.locator('button:has-text("Remove")');
        this.checkoutButton = page.locator('#checkout');
        this.continueShopping = page.locator('#continue-shopping');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async openCart() {
        await this.click(this.cartIcon);
    }

    async verifyCartItemCount(count: number) {
        await expect(this.cartItems).toHaveCount(count);
    }

    async verifyCartBadge(count: number) {
        await expect(this.cartBadge).toHaveText(count.toString());
    }

    async removeFirstProduct() {
        await this.removeButtons.first().click();
    }

    async removeAllProducts() {
        while (await this.removeButtons.count() > 0) {
            await this.removeButtons.first().click();
        }
    }

    async verifyEmptyCart() {
        await expect(this.cartItems).toHaveCount(0);
    }

    async verifyProductName() {
        await expect(this.page.locator('.inventory_item_name')).toBeVisible();
    }

    async verifyProductPrice() {
        await expect(this.page.locator('.inventory_item_price')).toContainText('$');
    }

    async verifyQuantity() {
        await expect(this.page.locator('.cart_quantity')).toHaveText('1');
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clickContinueShopping() {
        await this.continueShopping.click();
    }

}