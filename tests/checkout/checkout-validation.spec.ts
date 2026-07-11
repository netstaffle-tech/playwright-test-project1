import { test, expect } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@checkout @validation Checkout Validation', () => {

    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);

        await inventoryPage.addFirstProductToCart();

        await cartPage.openCart();
        await cartPage.clickCheckout();
    });

    test('TC123 Verify Checkout URL', async ({ page }) => {
        await expect(page).toHaveURL(/checkout-step-one/);
    });

    test('TC124 Verify First Name field', async ({ checkoutPage }) => {
        await checkoutPage.verifyFirstNameField();
    });

    test('TC125 Verify Last Name field', async ({ checkoutPage }) => {
        await checkoutPage.verifyLastNameField();
    });

    test('TC126 Verify Postal Code field', async ({ checkoutPage }) => {
        await checkoutPage.verifyPostalCodeField();
    });

    test('TC127 Verify Continue button', async ({ checkoutPage }) => {
        await checkoutPage.verifyContinueButton();
    });

    test('TC128 Verify Cancel button', async ({ checkoutPage }) => {
        await checkoutPage.verifyCancelButton();
    });

    test('TC129 Verify required validation', async ({ checkoutPage }) => {
        await checkoutPage.clickContinue();
        await checkoutPage.verifyError('Error: First Name is required');
    });

    test('TC130 Verify error icon', async ({ checkoutPage }) => {
        await checkoutPage.clickContinue();
        await checkoutPage.verifyErrorIcon();
    });

    test('TC131 Verify error removed after valid input', async ({ checkoutPage, inventoryPage }) => {
        await checkoutPage.clickContinue();
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '380015');
        await checkoutPage.clickContinue();
        await inventoryPage.verifyUrl(/checkout-step-two/);
    });

    test('TC132 Verify all fields visible', async ({ checkoutPage }) => {
        await checkoutPage.verifyCheckoutFields();
    });

});