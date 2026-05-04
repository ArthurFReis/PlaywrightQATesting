import { test, expect } from '@playwright/test';
import { NavegationPage } from './navegationPage';
import { LoginPage } from './loginPage';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/');
  });

test.describe.parallel('checkout', () => {

    test('cheout Authenticated', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        const loginPage = new LoginPage(page);
        await loginPage.login('valid_user', 'secret123');
        await page.locator('[data-id="2"]').click();
        await navigationPage.checkoutPage();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});
        await page.locator('#btnFinish').click();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder.png"});
    });

    test('cheout Unauthenticated', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await page.locator('[data-id="2"]').click();
        await navigationPage.checkoutPage();
        await page.locator('#btnFinish').click();
        
    });

});