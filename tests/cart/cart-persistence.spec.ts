import { test } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@cart Persistence', () => {

    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
        await inventoryPage.addFirstProductToCart();
    });

    test('TC089 Refresh page', async ({ cartPage }) => {
        await cartPage.openCart();
        await cartPage.refreshPage();
        await cartPage.verifyCartItemCount(1);

    });

    test('TC092 Cart persists after navigation', async ({ page, cartPage }) => {
        await cartPage.openCart();
        await cartPage.goBack();
        await cartPage.goForward();
        await cartPage.verifyCartItemCount(1);
    });

});