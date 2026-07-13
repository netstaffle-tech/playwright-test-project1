import { test } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@checkout @navigation Checkout Navigation', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);

        await inventoryPage.addFirstProductToCart();

        await cartPage.openCart();
        await cartPage.clickCheckout();
        await cartPage.waitForPageLoad();
    });

    test('TC133 Cancel Checkout', async ({ checkoutPage, cartPage }) => {
        await checkoutPage.clickCancel();
        await cartPage.verifyUrl(/cart/);
    });

    test('TC134 Browser Back', async ({ checkoutPage, cartPage }) => {
        await checkoutPage.goBack();
        await cartPage.verifyUrl(/cart/);
    });

    test('TC135 Browser Forward', async ({ checkoutPage, cartPage }) => {
        await checkoutPage.goBack();
        await checkoutPage.goForward();
        await checkoutPage.verifyUrl(/checkout-step-one/);
    });

    test('TC136 Refresh Checkout', async ({ checkoutPage, cartPage }) => {
        await checkoutPage.refreshPage();
        await checkoutPage.verifyCheckoutInformationPage();
    });

    test('TC137 Continue to Overview', async ({ checkoutPage, inventoryPage }) => {
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '380015');
        await Promise.all([
            checkoutPage.waitForURL("https://www.saucedemo.com/checkout-step-two.html"),
            checkoutPage.clickContinue()
        ]);
    });

}); 