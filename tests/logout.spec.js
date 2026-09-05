import { test, expect } from '@playwright/test';

import LoginPage from '../Pages/LoginPage.js';
import Logout from '../Pages/logout.js';

import LoginData from '../testdata/LogintestData.json' assert { type: 'json' };

test('Logout Test Case', async ({ page }) => {

    const login = new LoginPage(page);
    const logout = new Logout(page);

    // 1. Open URL & Login
    await page.goto('https://www.saucedemo.com/');

    const loginUser = LoginData.validUsers[0];
    await login.login(
        loginUser.username,
        loginUser.password
    );

    // 2. Perform Logout Action
    await logout.logout();

    // 3. Verify User Redirected to Login Page
    const loginPageDisplayed = await logout.isLoginPageDisplayed();
    expect(loginPageDisplayed).toBe(true);

});