import { test } from '../../fixtures/pageFixture';
import { checkoutToOverview } from '../../helpers/CheckoutHelper';

test.describe('@checkout Overview', () => {

    test.beforeEach(async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await checkoutToOverview(loginPage, inventoryPage, cartPage, checkoutPage);
    });

    test('TC111 Verify payment information', async ({ checkoutPage }) => {
        await checkoutPage.verifyPaymentInformation();
    });

    test('TC112 Verify shipping information', async ({ checkoutPage }) => {
        await checkoutPage.verifyShippingInformation();
    });

    test('TC113 Verify item total', async ({ checkoutPage }) => {
        await checkoutPage.verifyItemTotal();
    });

    test('TC114 Verify tax', async ({ checkoutPage }) => {
        await checkoutPage.verifyTax();
    });

    test('TC115 Verify total price', async ({ checkoutPage }) => {
        await checkoutPage.verifyTotal();
    });
});