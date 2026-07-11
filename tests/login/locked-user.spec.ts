import { test, expect } from '../../fixtures/pageFixture';
import { lockedOutUser } from '../../test_data/login.json';
import { oneTimeLogin } from '../../helpers/CheckoutHelper';

test.describe('@login @negative Locked User', () => {
    test('TC010 @regression Locked user should not login', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, lockedOutUser.username, lockedOutUser.password);

        await loginPage.verifyLockedUserError();
    });
});