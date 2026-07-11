import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { validUser } from '../test_data/login.json'

//Common Checkout function
export async function checkoutToOverview(
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    cartPage: CartPage,
    checkoutPage: CheckoutPage
) {
    await loginPage.goTo();
    await loginPage.login(validUser.username, validUser.password);
    await inventoryPage.addFirstProductToCart();
    await cartPage.openCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillCheckoutInformation('John', 'Doe', '380015');
    await checkoutPage.clickContinue();
}

//Common Login function for all
export async function oneTimeLogin(
    loginPage: LoginPage,
    username: string,
    password: string
) {
    await loginPage.goTo();
    await loginPage.login(username, password);
}