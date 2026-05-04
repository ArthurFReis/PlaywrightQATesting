import { test, expect } from '@playwright/test';
import { NavegationPage } from './navegationPage';


test.beforeEach(async ({ page }) => {
     await page.goto('http://localhost:8080/');
  });

test('menu', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.homePage();
        await page.screenshot({path: "Evidencias/Home/Menuhome.png"});
        await navigationPage.loginPage();
        await page.screenshot({path: "Evidencias/Home/Menulogin.png"});
        await navigationPage.productsPage();
        await page.screenshot({path: "Evidencias/Home/Menuproducts.png"}); 
        await navigationPage.checkoutPage();  
        await page.screenshot({path: "Evidencias/Home/Menucheckout.png"});
  });

  test.afterAll(async ({ page }) => {
     await page.goto('http://localhost:8080/');
  });