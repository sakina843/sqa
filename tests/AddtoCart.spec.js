import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import AddtoCart from '../Pages/AddtoCart.js';

import LoginData from '../testdata/LogintestData.json' assert { type: 'json' };
import CartData from '../testdata/AddToCart.json' assert { type: 'json' };

test('Add Two Products to Cart', async ({ page }) => {
    const login = new LoginPage(page);
    const cart = new AddtoCart(page);

    // 1. Open Site & Login
    await page.goto('https://www.saucedemo.com/');
    const loginUser = LoginData.validUsers[0];
    
    await login.login(
        loginUser.username,
        loginUser.password
    );

    // 2. Verify Products Page
    await expect(page.locator('.title')).toHaveText('Products');

    // 3. Add Products to Cart
    await cart.addMultipleProducts(CartData.products);

    // 4. Open Cart
    await cart.openCart();

    // 5. Verify Cart Item Count
    const cartCount = await cart.getCartItemCount();
    expect(cartCount).toBe(CartData.expectedCartItemCount);

    // 6. Verify Product Names
    const cartProducts = await cart.getCartItemNames();
    for (const product of CartData.products) {
        expect(cartProducts).toContain(product);
    }
});