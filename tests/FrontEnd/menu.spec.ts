import { test, expect } from '@playwright/test';
import { NavegationPage } from './navegationPage';  

test.beforeEach(async ({ page }) => {
     await page.goto('http://localhost:8080/');
  });

test('menu', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.homePage();
        await page.screenshot({path: "Evidencias/Menu/Menuhome.png"});
        await navigationPage.loginPage();
        await page.screenshot({path: "Evidencias/Menu/Menulogin.png"});
        await navigationPage.productsPage();
        await page.screenshot({path: "Evidencias/Menu/Menuproducts.png"}); 
        await navigationPage.checkoutPage();  
        await page.screenshot({path: "Evidencias/Menu/Menucheckout.png"});
  });