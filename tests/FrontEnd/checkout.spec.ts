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
        const btnLogin = await page.locator('#btnLogin').isDisabled();
        if (btnLogin === true) {
            console.log('O botão de login está desabilitado, verifique os campos de preenchimento');
        }
        else {
            await page.locator('#btnLogin').click();
        }
        const adicionar = await page.locator('[data-id="2"]').isDisabled();
        if (adicionar === true) {
            console.log('O botão de adicionar ao carrinho está desabilitado, verifique os campos de preenchimento');
        }
        else {
            await page.click('[data-id="2"]');
        }
        await navigationPage.checkoutPage();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});
        const btnfinish = await page.locator('#btnFinish').isDisabled();
        if (btnfinish === true) {
            console.log('O botão de finalizar pedido está desabilitado, verifique os campos de preenchimento');
        }
        else {
            await page.click('#btnFinish');
            await expect(page.locator('#msg')).toHaveText('Order placed successfully');
        }
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder.png"});
    });

    test('cheout Unauthenticated', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await page.click('[data-id="2"]');
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto2.png"});
        //await page.locator('[data-id="2"]').click();
        await navigationPage.checkoutPage();
        const btnfinish = await page.locator('#btnFinish').isDisabled();
        if (btnfinish === true) {
            console.log('O botão de finalizar pedido está desabilitado, verifique os campos de preenchimento');
        }
        else {
            await page.click('#btnFinish');
            await expect(page.locator('#msg')).toHaveText('User not authenticated');
        }   
        //await page.locator('#btnFinish').click();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder2.png"});
        
    });

});