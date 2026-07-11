import { test, expect } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@cart Add Cart', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
    });

    test('TC076 Add single product', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addFirstProductToCart();
        await cartPage.openCart();
        await cartPage.verifyCartItemCount(1);
    });

    test('TC077 Add multiple products', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addMultipleProducts(3);
        await cartPage.openCart();
        await cartPage.verifyCartItemCount(3);
    });
});