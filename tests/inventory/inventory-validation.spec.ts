import { test, expect } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@inventory @validation Inventory Validation', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
    });

    test('TC061 @smoke Verify Inventory URL', async ({ inventoryPage }) => {
        await inventoryPage.verifyUrl(/inventory/);
    });

    test('TC062 @smoke Verify page title', async ({ inventoryPage }) => {
        await inventoryPage.verifyTitle('Swag Labs');
    });

    test('TC063 Verify page heading', async ({ inventoryPage }) => {
        await inventoryPage.verifyPageHeading();
    });

    test('TC064 Verify shopping cart icon', async ({ inventoryPage }) => {
        await inventoryPage.verifyCartIcon();


    });

    test('TC065 Verify shopping cart is clickable', async ({ inventoryPage }) => {
        await inventoryPage.openCart();
        await inventoryPage.verifyUrl(/cart/);
    });

    test('TC066 Verify hamburger menu', async ({ inventoryPage }) => {
        await inventoryPage.verifyMenuButton();
    });

    test('TC067 Verify sorting dropdown', async ({ inventoryPage }) => {

        await inventoryPage.verifySortingDropdown();

    });

    test('TC068 Verify Add to Cart button count', async ({ inventoryPage }) => {
        await inventoryPage.verifyAddToCartButtonCount(6);
    });

    test('TC069 Verify product names', async ({ inventoryPage }) => {
        await inventoryPage.verifyAllProductNames();
    });

    test('TC070 Verify product prices', async ({ inventoryPage }) => {
        await inventoryPage.verifyAllProductPrices();
    });

    test('TC072 Verify refresh', async ({ inventoryPage }) => {
        await inventoryPage.refreshPage();
        await inventoryPage.verifyUrl(/inventory/);
    });


    test('TC073 Verify browser back', async ({ inventoryPage, productDetailsPage }) => {
        await inventoryPage.openFirstProduct();
        await productDetailsPage.backToProducts();
        await inventoryPage.verifyUrl(/inventory/);

    });

    test('TC074 Verify browser forward', async ({ inventoryPage, productDetailsPage }) => {
        await inventoryPage.openFirstProduct();
        await inventoryPage.verifyUrl(/inventory-item/);

        await productDetailsPage.backToProducts();
        await inventoryPage.verifyUrl(/inventory/);
    });

    test('TC075 @sanity Verify inventory page loaded', async ({ inventoryPage }) => {
        await inventoryPage.verifyInventoryLoaded();
    });
});