import { test as base } from '@playwright/test';

//Class Import for fixture
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type MyFixtures = {
    loginPage: LoginPage
    inventoryPage: InventoryPage
    productDetailsPage: ProductDetailsPage
    cartPage: CartPage
    checkoutPage: CheckoutPage
}

//Fixture to create object and define, so everytime no need to declare
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page))
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page))
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    }

});


//Auto assign all classes in expect
export { expect } from '@playwright/test'

