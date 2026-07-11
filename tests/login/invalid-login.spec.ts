import { test, expect } from '../../fixtures/pageFixture';
import { blankPassword, blankUsername, invalidUsername, invalidPassword } from '../../test_data/login.json';
import { oneTimeLogin } from '../../helpers/CheckoutHelper';

test.describe('@login @negative Invalid Login', () => {
    test('TC006 Blank username', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, blankUsername.username, blankUsername.password);

        await loginPage.verifyVisible(loginPage.errorMessage)
        await loginPage.verifyText(loginPage.errorMessage, 'Epic sadface: Username is required');
    });

    test('TC007 Blank password', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, blankPassword.username, blankPassword.password);

        await loginPage.verifyVisible(loginPage.errorMessage)
        await loginPage.verifyText(loginPage.errorMessage, 'Epic sadface: Password is required');
    });

    test('TC008 Invalid username', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, invalidUsername.username, invalidUsername.password);
        await loginPage.verifyError('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC009 Invalid password', async ({ loginPage }) => {
        //Login Process
        await oneTimeLogin(loginPage, invalidPassword.username, invalidPassword.password);
        await loginPage.verifyError('Epic sadface: Username and password do not match any user in this service');
    });
});