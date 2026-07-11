import { test, expect } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@cart Validation', () => {

    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
        await inventoryPage.addFirstProductToCart();
        await cartPage.openCart();

    });

    test('TC081 Verify cart URL', async ({ cartPage }) => {
        await cartPage.verifyUrl(/cart/);
    });

    test('TC082 Verify page title', async ({ inventoryPage }) => {
        await inventoryPage.verifyTitle('Swag Labs');
    });

    test('TC083 Verify product name', async ({ cartPage }) => {
        await cartPage.verifyProductName();
    });

    test('TC084 Verify product price', async ({ cartPage }) => {
        await cartPage.verifyProductPrice();
    });

    test('TC085 Verify quantity', async ({ cartPage }) => {
        await cartPage.verifyQuantity();
    });

});