import { test } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@cart Remove Cart', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
        await inventoryPage.addMultipleProducts(2);
        await cartPage.openCart();
    });

    test('TC078 Remove single item', async ({ cartPage }) => {
        await cartPage.removeFirstProduct();
        await cartPage.verifyCartItemCount(1);
    });

    test('TC079 Remove all items', async ({ cartPage }) => {
        await cartPage.removeAllProducts();
        await cartPage.verifyEmptyCart();
    });

});