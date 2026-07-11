import { test, expect } from '../../fixtures/pageFixture';
import { validUser, problemUser } from '../../test_data/login.json';

test.describe('@inventory @regression Inventory Module', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
    });

    test('TC021 Verify all products displayed', async ({ inventoryPage }) => {
        await inventoryPage.verifyAllProductsDisplayed();
    });

    test('TC022 Verify product image', async ({ inventoryPage }) => {
        await inventoryPage.verifyProductImages();
    });

    test('TC023 Verify product title', async ({ inventoryPage }) => {
        await inventoryPage.verifyProductTitles();
    });

    test('TC024 Verify product price', async ({ inventoryPage }) => {
        await inventoryPage.verifyProductPrices();
    });

    test('TC025 Verify product description', async ({ inventoryPage }) => {
        await inventoryPage.verifyProductDescriptions();
    });

    test('TC026 Open product details', async ({ inventoryPage }) => {
        await inventoryPage.openFirstProduct();
        await inventoryPage.verifyUrl(/inventory-item/);
    });

    test('TC027 Back to products', async ({ inventoryPage }) => {
        await inventoryPage.openFirstProduct();
        await inventoryPage.backToProducts();
        await inventoryPage.verifyUrl(/inventory/);
    });

    test('TC028 Verify inventory count', async ({ inventoryPage }) => {
        await inventoryPage.verifyInventoryCount(6);
    });

    test('TC029 Verify page title', async ({ inventoryPage }) => {
        await inventoryPage.verifyTitle('Swag Labs');
    });

    test('TC030 Verify logo', async ({ inventoryPage }) => {
        await inventoryPage.verifyLogo();
    });

    test('TC031 Verify footer', async ({ inventoryPage }) => {
        await inventoryPage.verifyFooter();
    });

    test('TC032 Verify responsive layout', async ({ inventoryPage }) => {
        await inventoryPage.pageSize(390, 844);
        await inventoryPage.verifyResponsiveLayout();
    });

    test('TC033 Verify broken images', async ({ inventoryPage }) => {
        await inventoryPage.verifyBrokenImages();
    });

    test('TC034 Verify product URL', async ({ inventoryPage }) => {
        await inventoryPage.openFirstProduct();
        await inventoryPage.verifyUrl(/inventory-item/);
    });

    test('TC035 Verify browser refresh', async ({ inventoryPage }) => {
        await inventoryPage.refreshPage();
        await inventoryPage.verifyUrl(/inventory/);
    });

});