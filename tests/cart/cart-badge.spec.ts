import { test } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';

test.describe('@cart Badge', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
        await loginPage.login(validUser.username, validUser.password);
    });

    test('TC080 Verify cart badge', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addMultipleProducts(2);
        await cartPage.verifyCartBadge(2);
    });
});