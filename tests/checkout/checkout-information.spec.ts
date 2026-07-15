import { test, expect } from '../../fixtures/pageFixture';
import { InventoryPage } from '../../pages/InventoryPage';
import { validUser } from '../../test_data/login.json';

test.describe('@checkout Checkout Information', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
        await inventoryPage.addFirstProductToCart();

        await cartPage.openCart();
        await cartPage.clickCheckout();
    });

    test('TC101 @smoke Valid Checkout details', async ({ checkoutPage, inventoryPage }) => {
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '380015');
        await checkoutPage.clickContinue();

        await inventoryPage.verifyUrl(/checkout-step-two/);
    });

    test('TC102 Blank First Name', async ({ checkoutPage }) => {
        await checkoutPage.fillCheckoutInformation('', 'Doe', '380015');
        await checkoutPage.clickContinue();
        await checkoutPage.verifyError('Error: First Name is required');
    });

    test('TC103 Blank Last Name', async ({ checkoutPage }) => {
        await checkoutPage.fillCheckoutInformation('John', '', '380015');
        await checkoutPage.clickContinue();
        await checkoutPage.verifyError('Error: Last Name is required');
    });

    test('TC104 Blank Postal Code', async ({ checkoutPage }) => {
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '');
        await checkoutPage.clickContinue();
        await checkoutPage.verifyError('Error: Postal Code is required');
    });

});