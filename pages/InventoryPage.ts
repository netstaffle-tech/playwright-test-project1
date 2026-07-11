import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    //Define Variable
    readonly products: Locator;
    readonly productImages: Locator;
    readonly productTitles: Locator;
    readonly productPrices: Locator;
    readonly productDescriptions: Locator;
    readonly logo: Locator;
    readonly footer: Locator;
    readonly backButton: Locator;

    //Sorting
    readonly sortDropdown: Locator;
    readonly productNames: Locator;

    //Validation
    readonly heading: Locator;
    readonly cartIcon: Locator;
    readonly menuButton: Locator;
    readonly addToCartButtons: Locator;

    constructor(page: Page) {
        super(page);
        this.products = page.locator('.inventory_item');
        this.productImages = page.locator('.inventory_item_img img');
        this.productTitles = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.productDescriptions = page.locator('.inventory_item_desc');
        this.logo = page.locator('.app_logo');
        this.footer = page.locator('.footer');
        this.backButton = page.locator('#back-to-products');

        //Sorting
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');

        //validation
        this.heading = page.locator('.title');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.addToCartButtons = page.locator('button:has-text("Add to cart")');
        this.footer = page.locator('.footer');
    }

    //Verify All Products Displayed
    async verifyAllProductsDisplayed() {
        await expect(this.products).toHaveCount(6);
    }

    //View Products Images
    async verifyProductImages() {
        const count = await this.productImages.count();

        for (let i = 0; i < count; i++) {
            await expect(this.productImages.nth(i)).toBeVisible();
        }
    }

    //Verify Products Title
    async verifyProductTitles() {
        const count = await this.productTitles.count();

        for (let i = 0; i < count; i++) {
            await expect(this.productTitles.nth(i)).not.toHaveText('');
        }
    }

    //Verify Product Price
    async verifyProductPrices() {
        const count = await this.productPrices.count();

        for (let i = 0; i < count; i++) {
            await expect(this.productPrices.nth(i)).toContainText('$');
        }
    }

    //Verify Product Description
    async verifyProductDescriptions() {
        const count = await this.productDescriptions.count();

        for (let i = 0; i < count; i++) {
            await expect(this.productDescriptions.nth(i)).not.toHaveText('');
        }
    }

    //Open First Product
    async openFirstProduct() {
        await this.productTitles.first().click();
    }

    //Back to Products
    async backToProducts() {
        await this.backButton.click();
    }

    //Verify Inventory Count
    async verifyInventoryCount(expected: number) {
        await expect(this.products).toHaveCount(expected);
    }

    //Verify Logo
    async verifyLogo() {
        await expect(this.logo).toBeVisible();
    }

    //Verify Footer
    async verifyFooter() {
        await expect(this.footer).toBeVisible();
    }

    //Verify Responsive Layout
    async verifyResponsiveLayout() {
        await expect(this.products.first()).toBeVisible();
    }

    //page site
    async pageSize(widthVal: number, heightVal: number) {
        await this.page.setViewportSize({ width: widthVal, height: heightVal });
    }

    //Verify Broken Images
    async verifyBrokenImages() {
        const count = await this.productImages.count();

        for (let i = 0; i < count; i++) {
            const img = this.productImages.nth(i);
            await expect(img).toBeVisible();
            const naturalWidth = await img.evaluate(
                (element: HTMLImageElement) => element.naturalWidth
            );

            expect(naturalWidth).toBeGreaterThan(0);
        }
    }

    //Sorting Related Functions
    //Get All Product Names
    async getProductNames() {
        const names = await this.productNames.allTextContents();
        return names;
    }

    //Get All Product Prices
    async getProductPrices() {
        const prices = await this.productPrices.allTextContents();
        return prices;
    }

    //Verify Default Sorting
    async verifyDefaultSorting() {
        await expect(this.sortDropdown).toHaveValue('az');
    }

    //Verify Selected Option
    async verifySelectedOption(value: string) {
        await expect(this.sortDropdown).toHaveValue(value);
    }

    //Verify Dropdown Options
    async verifySortingOptions() {
        await expect(this.sortDropdown).toContainText('Name (A to Z)');
        await expect(this.sortDropdown).toContainText('Name (Z to A)');
        await expect(this.sortDropdown).toContainText('Price (low to high)');
        await expect(this.sortDropdown).toContainText('Price (high to low)');
    }


    //Verify Name A-Z
    async verifyNameAZSorting() {
        const names = await this.productNames.allTextContents();
        const expected = [...names].sort();
        expect(names).toEqual(expected);
    }

    //Verify Name Z-A
    async verifyNameZASorting() {
        const names = await this.productNames.allTextContents();
        const expected = [...names].sort().reverse();
        expect(names).toEqual(expected);
    }

    //Verify Price Low to High
    async verifyPriceLowToHighSorting() {
        const prices = await this.productPrices.allTextContents();
        const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);
        expect(numericPrices).toEqual(sortedPrices);
    }

    //Verify Price High to Low
    async verifyPriceHighToLowSorting() {
        const prices = await this.productPrices.allTextContents();
        const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...numericPrices].sort((a, b) => b - a);
        expect(numericPrices).toEqual(sortedPrices);
    }

    //Add First Product
    async addFirstProductToCart() {
        await this.page.locator('button:has-text("Add to cart")').first().click();
    }

    async sortByNameAZ() {
        await this.sortDropdown.selectOption('az');
    }

    async sortByNameZA() {
        await this.sortDropdown.selectOption('za');
    }

    async sortByPriceLowHigh() {
        await this.sortDropdown.selectOption('lohi');
    }

    async sortByPriceHighLow() {
        await this.sortDropdown.selectOption('hilo');
    }

    //Validation Test Case
    async verifyPageHeading() {
        await expect(this.heading).toHaveText('Products');
    }

    async verifyCartIcon() {
        await expect(this.cartIcon).toBeVisible();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async verifyMenuButton() {
        await expect(this.menuButton).toBeVisible();
    }

    async verifySortingDropdown() {
        await expect(this.sortDropdown).toBeVisible();
    }

    async verifyAddToCartButtonCount(expected: number) {
        await expect(this.addToCartButtons).toHaveCount(expected);
    }

    async verifyAllProductNames() {
        const count = await this.productNames.count();

        for (let i = 0; i < count; i++) {
            await expect(this.productNames.nth(i)).not.toHaveText('');
        }
    }

    async verifyAllProductPrices() {
        const count = await this.productPrices.count();
        for (let i = 0; i < count; i++) {
            await expect(this.productPrices.nth(i)).toContainText('$');
        }
    }

    async verifyInventoryLoaded() {
        await expect(this.heading).toBeVisible();
        await expect(this.sortDropdown).toBeVisible();
        await expect(this.cartIcon).toBeVisible();
    }

    async addMultipleProducts(count: number) {
        const totalProducts = await this.addToCartButtons.count();
        if (count > totalProducts) {
            throw new Error(
                `Only ${totalProducts} products are available, but requested ${count}.`
            );
        }

        for (let i = 0; i < count; i++) {
            await this.addToCartButtons.nth(i).click();
        }
    }

}