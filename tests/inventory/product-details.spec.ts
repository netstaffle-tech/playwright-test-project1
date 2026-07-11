import { test, expect } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@inventory @product Product Details', () => {
    //Login and Open Product Details Page | Every test case
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
        await inventoryPage.openFirstProduct();
    });

    test('TC046 @smoke Verify user can open product details', async ({ productDetailsPage }) => {
        await productDetailsPage.verifyUrl(/inventory-item/);
    });

    test('TC047 Verify product name', async ({ productDetailsPage }) => {
        await productDetailsPage.verifyProductName();
    });

    test('TC048 Verify product description', async ({ productDetailsPage }) => {
        await productDetailsPage.verifyProductDescription();
    });

    test('TC049 Verify product price', async ({ productDetailsPage }) => {
        await productDetailsPage.verifyProductPrice();
    });

    test('TC050 Verify product image', async ({ productDetailsPage }) => {
        await productDetailsPage.verifyProductImage();
    });

    test('TC051 Verify Back To Products button', async ({ productDetailsPage }) => {
        await productDetailsPage.clickBackToProducts();
        await productDetailsPage.verifyUrl(/inventory/);
    });

    test('TC052 Verify Add To Cart', async ({ productDetailsPage }) => {
        await productDetailsPage.addToCart();
        await productDetailsPage.verifyRemoveButton();
    });

    test('TC053 Verify Remove button', async ({ productDetailsPage }) => {
        await productDetailsPage.addToCart();
        await productDetailsPage.removeFromCart();
        await productDetailsPage.verifyAddToCartButton();
    });

    test('TC054 Verify cart badge', async ({ productDetailsPage }) => {
        await productDetailsPage.addToCart();
        await productDetailsPage.verifyCartBadgeCount(1);
    });

    test('TC055 Verify refresh on details page', async ({ productDetailsPage }) => {
        await productDetailsPage.refreshPage();
        await productDetailsPage.verifyUrl(/inventory-item/);
    });

    test('TC056 Verify URL', async ({ productDetailsPage }) => {
        await productDetailsPage.verifyUrl(/inventory-item/);
    });

    test('TC057 Verify browser back', async ({ inventoryPage, productDetailsPage }) => {
        await inventoryPage.backToProducts();
        await productDetailsPage.verifyUrl(/inventory/);
    });

    test('TC058 Verify browser forward', async ({ productDetailsPage }) => {
        await productDetailsPage.backToProducts();
        await productDetailsPage.verifyUrl(/inventory/);
    });

    test('TC059 Verify page title', async ({ productDetailsPage }) => {
        await productDetailsPage.verifyTitle('Swag Labs');
    });

    test('TC060 @sanity Verify details page loaded', async ({ productDetailsPage }) => {
        await productDetailsPage.verifyPageLoaded();
    });

});