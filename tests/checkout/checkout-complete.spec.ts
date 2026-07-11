import { test } from '../../fixtures/pageFixture';
import { checkoutToOverview } from '../../helpers/CheckoutHelper';

test.describe('@checkout Complete', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await checkoutToOverview(loginPage, inventoryPage, cartPage, checkoutPage);
    });

    test('TC118 Finish checkout', async ({ checkoutPage }) => {
        await checkoutPage.verifyUrl(/checkout-complete/);
    });

    test('TC119 Verify Thank You message', async ({ checkoutPage }) => {
        await checkoutPage.verifySuccessMessage();
    });

    test('TC120 Back Home', async ({ checkoutPage, inventoryPage }) => {
        await checkoutPage.clickBackHome();
        await inventoryPage.verifyUrl(/inventory/);
    });

});