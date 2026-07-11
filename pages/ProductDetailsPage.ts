import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
    //Define Variable
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly backButton: Locator;
    readonly cartBadge: Locator;
    readonly products: Locator;

    constructor(page: Page) {
        super(page);
        this.products = page.locator('div.inventory_item');
        this.productName = page.locator('.inventory_details_name');
        this.productDescription = page.locator('.inventory_details_desc');
        this.productPrice = page.locator('.inventory_details_price');
        this.productImage = page.locator('img.inventory_details_img');

        this.addToCartButton = page.locator('button:has-text("Add to cart")');
        this.removeButton = page.locator('button:has-text("Remove")');
        this.backButton = page.locator('#back-to-products');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addToCart() {
        await this.click(this.addToCartButton);
    }

    async remove() {
        await this.click(this.removeButton);
    }

    async backToProducts() {
        await this.click(this.backButton);
    }

    async verifyCartBadge() {
        await expect(this.cartBadge).toBeVisible();
    }

    async verifyProductDetailsPage() {
        await expect(this.page).toHaveURL(/inventory-item/);
    }

    async verifyProductName() {
        await expect(this.productName).toBeVisible();
        await expect(this.productName).not.toHaveText('');
    }

    async verifyProductDescription() {
        await expect(this.productDescription).not.toHaveText('');
    }

    async verifyProductPrice() {
        await expect(this.productPrice).toContainText('$');
    }

    async verifyProductImage() {
        await expect(this.productImage).toBeVisible();
    }

    async clickBackToProducts() {
        await this.click(this.backButton);
    }

    async verifyInventoryPage() {
        await expect(this.page).toHaveURL(/inventory/);
    }

    async removeFromCart() {
        await this.click(this.removeButton);
    }

    async verifyRemoveButton() {
        await expect(this.removeButton).toBeVisible();
    }

    async verifyAddToCartButton() {
        await expect(this.addToCartButton).toBeVisible();
    }

    async verifyCartBadgeCount(count: number) {
        await expect(this.cartBadge).toHaveText(count.toString());
    }

    async verifyPageLoaded() {
        await expect(this.productName).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productDescription).toBeVisible();
    }

    // //page Reload
    // async pageReload() {
    //     await this.page.reload();

    // async goForward() {
    //     await this.products.first().click();
    // }

}