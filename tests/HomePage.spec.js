import { test, expect } from '@playwright/test';

import LoginPage from '../Pages/LoginPage.js';
import HomePage from '../Pages/HomePage.js';

import LoginData from '../testdata/LogintestData.json' assert { type: 'json' };
import HomeData from '../testdata/HomePage.json' assert { type: 'json' };

test('Verify Home Products Page', async ({ page }) => {

    // Create Page Objects
    const login = new LoginPage(page);
    const home = new HomePage(page);

    // ==========================================
    // 1. Navigate & Login
    // ==========================================
    await page.goto('https://www.saucedemo.com/');

    const loginUser = LoginData.validUsers[0];

    await login.login(
        loginUser.username,
        loginUser.password
    );

    // Screenshot after login
    await home.attachScreenshot(
        '01 - Home Page Opened'
    );

    // ==========================================
    // 2. Verify Products Page Title
    // ==========================================
    await expect(home.productsTitle).toHaveText(
        HomeData.expectedTitle
    );

    // Screenshot after verifying title
    await home.attachScreenshot(
        '02 - Products Page Title Verified'
    );

    // ==========================================
    // 3. Verify Products Container
    // ==========================================
    const productsVisible = await home.isProductsContainerVisible();
    expect(productsVisible).toBe(true);

    // Screenshot after verifying products container
    await home.attachScreenshot(
        '03 - Products Container Verified'
    );

    // ==========================================
    // 4. Verify Product Count
    // ==========================================
    const productCount = await home.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(
        HomeData.minimumProducts
    );

    // Screenshot after verifying product count
    await home.attachScreenshot(
        '04 - Product Count Verified'
    );

    // ==========================================
    // 5. Verify Product Names
    // ==========================================
    const productNames = await home.getProductNames();

    for (const product of HomeData.expectedProducts) {
        expect(productNames).toContain(product);
    }

    // Screenshot after verifying product names
    await home.attachScreenshot(
        '05 - Product Names Verified'
    );

    // ==========================================
    // 6. Verify Cart Icon
    // ==========================================
    const cartVisible = await home.isCartIconVisible();
    expect(cartVisible).toBe(true);

    // Final Home Page Screenshot
    await home.attachScreenshot(
        '06 - Home Page Test Completed'
    );

});