import { test, expect } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';
import { oneTimeLogin } from '../../helpers/CheckoutHelper';


test.describe('@logout @smoke @positive Logout successfully', () => {
    test('TC011 @smoke Logout successfully', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, validUser.username, validUser.password);

        // Logout process
        await loginPage.logout();

        //verify logout
        await loginPage.verifyLoginPage();
    })
});