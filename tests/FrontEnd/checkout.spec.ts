import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';


test.beforeEach(async ({ page }) => {
     const browser = await webkit.launch();
         const context = await browser.newContext();
         await page.goto('http://localhost:8080/');
         await expect(page).toHaveURL('http://localhost:8080/');
         await page.screenshot({path: "Evidencias/Checkout/BeforeEach.png"});
  });

test.describe.parallel('checkout', () => {

    test('cheout Authenticated', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.loginPage();
        await page.locator('#username').fill('valid_user');
        await page.locator('#password').fill('secret123');
        await page.locator('#btnLogin').click();
        await page.locator('[data-id="2"]').click();
        await navigationPage.checkoutPage();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});
        await page.locator('#btnFinish').click();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder.png"});
    });

    test('cheout Unauthenticated', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await page.click('[data-id="2"]');
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto2.png"});
        //await page.locator('[data-id="2"]').click();
        await navigationPage.checkoutPage();
        await page.click('#btnFinish');
        //await page.locator('#btnFinish').click();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder2.png"});
        
    });

});