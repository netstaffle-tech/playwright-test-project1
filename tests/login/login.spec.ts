import { test, expect } from '../../fixtures/pageFixture';
import { validUser, problemUser } from '../../test_data/login.json';
import { oneTimeLogin } from '../../helpers/CheckoutHelper';

test.describe('@login @smoke Login Module', () => {

    test("TC001 @smoke @positive Login with valid standard user", async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, validUser.username, validUser.password);
        // validate login
        await loginPage.verifyUrl(/inventory/);
    });

    test("TC002 @positive Login with problem user", async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, validUser.username, validUser.password);
        // validate login

        //validate login
        await loginPage.verifyUrl(/inventory/);
    });

    test("TC003 @positive Login using Enter key", async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, validUser.username, validUser.password);

        // validate login
        await loginPage.verifyUrl(/inventory/);
    });

    test("TC004 @positive Verify Login Page UI", async ({ loginPage }) => {
        await loginPage.goTo();

        await loginPage.verifyVisible(loginPage.usernameInput);
        await loginPage.verifyVisible(loginPage.passwordInput);
        await loginPage.verifyVisible(loginPage.loginButton);
        await loginPage.verifyEnabled(loginPage.loginButton);
    });

    test("TC005 @positive Verify login response time less < 1 Second", async ({ loginPage }) => {
        await loginPage.goTo();
        const startTime = Date.now();
        await loginPage.login(validUser.username, validUser.password);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        await loginPage.toBeLessThan(responseTime, 1000);
    });
});