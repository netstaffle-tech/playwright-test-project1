import { test, expect } from '../../fixtures/pageFixture';
import { validUser, problemUser } from '../../test_data/login.json';

test.describe('@inventory @sorting Inventory Sorting', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
    });

    test('TC036 @smoke Verify default sorting is Name (A to Z)', async ({ inventoryPage }) => {
        await inventoryPage.verifyDefaultSorting();
    });

    test('TC037 Verify Name (A to Z)', async ({ inventoryPage }) => {
        await inventoryPage.sortByNameAZ();
        await inventoryPage.verifyNameAZSorting();
    });

    test('TC038 Verify Name (Z to A)', async ({ inventoryPage }) => {
        await inventoryPage.sortByNameZA();
        await inventoryPage.verifyNameZASorting();
    });

    test('TC039 Verify Price Low to High', async ({ inventoryPage }) => {
        await inventoryPage.sortByPriceLowHigh();
        await inventoryPage.verifyPriceLowToHighSorting();
    });

    test('TC040 Verify Price High to Low', async ({ inventoryPage }) => {
        await inventoryPage.sortByPriceHighLow();
        await inventoryPage.verifyPriceHighToLowSorting();
    });

    test('TC041 Verify sorting dropdown options', async ({ inventoryPage }) => {
        await inventoryPage.verifySortingOptions();
    });

    test('TC042 Verify selected sorting option', async ({ inventoryPage }) => {
        await inventoryPage.sortByPriceLowHigh();
        await inventoryPage.verifySelectedOption('lohi');
    });

    test('TC043 Verify sorting after refresh', async ({ inventoryPage }) => {
        await inventoryPage.sortByNameAZ();
        await inventoryPage.refreshPage();
        await inventoryPage.verifySelectedOption('az');
    });

    test('TC044 Verify sorting after opening product details', async ({ inventoryPage }) => {
        await inventoryPage.sortByNameAZ();
        await inventoryPage.openFirstProduct();
        await inventoryPage.backToProducts();

        await inventoryPage.verifySelectedOption('az');
    });

    test('TC045 Verify sorting after adding product to cart', async ({ inventoryPage }) => {
        await inventoryPage.sortByPriceLowHigh();
        await inventoryPage.addFirstProductToCart();

        await inventoryPage.verifySelectedOption('lohi');
    });

});