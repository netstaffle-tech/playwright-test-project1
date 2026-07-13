import { test } from '../../fixtures/pageFixture';
import { checkoutToOverview } from '../../helpers/CheckoutHelper';

test.describe('@checkout Complete', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await checkoutToOverview(loginPage, inventoryPage, cartPage, checkoutPage);
    });

    test('TC118 Finish checkout', async ({ checkoutPage }) => {
        await checkoutPage.verifyUrl(/checkout-step-two/);
        await checkoutPage.clickFinish();
        await checkoutPage.verifyUrl(/checkout-complete/);
        await checkoutPage.verifySuccessMessage();
    });

});