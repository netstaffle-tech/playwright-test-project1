import { test, expect } from '../../fixtures/pageFixture';
import { validUser } from '../../test_data/login.json';
import { oneTimeLogin } from '../../helpers/CheckoutHelper';

test.describe('@login Session', () => {

    test('TC012 Session persists after refresh', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, validUser.username, validUser.password);
        await loginPage.refreshPage();

        await loginPage.verifyUrl(/inventory/);
    });

    test('TC013 @negative Check login session after browser back', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, validUser.username, validUser.password);
        await loginPage.goBack();
        await loginPage.verifyLoginPage();
    });

    test('TC014 @negative SQL Injection', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, "OR 1=1", validUser.password);
        await loginPage.verifyVisible(loginPage.errorMessage);
    });

    test('TC015 @security XSS Attack', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, '"<script>alert(\x27XSS\x27)</script>"', validUser.password);
        await loginPage.verifyVisible(loginPage.errorMessage);
    });
});