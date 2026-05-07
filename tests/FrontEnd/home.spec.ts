import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';
import { pageResponsivoHome } from '../../app/Comum/Home/home';



test.beforeEach(async ({ page }) => {
         const browser = await webkit.launch();
         const context = await browser.newContext();
         await page.goto('http://localhost:8080/');
         await expect(page).toHaveURL('http://localhost:8080/');
         await page.screenshot({path: "Evidencias/Home/BeforeEach.png"});
  });

  
test.describe.parallel('Login', () => {

test('Home Responsivo', async ({ page }) => {
        await page.goto('http://localhost:8080/');
         await expect(page).toHaveURL('http://localhost:8080/');
        await pageResponsivoHome(page);
    });

test('Home', async ({ page }) => {
        const navigationPage = new NavegationPage(page);  
        await navigationPage.homePage();
        await expect(page).toHaveURL('http://localhost:8080/index.html');
        await page.screenshot({path: "Evidencias/Home/Menuhome.png"});
        await navigationPage.loginPage();
        await expect(page).toHaveURL('http://localhost:8080/login.html');
        await page.screenshot({path: "Evidencias/Home/Menulogin.png"});
        await navigationPage.productsPage();
        await expect(page).toHaveURL('http://localhost:8080/products.html');
        await page.screenshot({path: "Evidencias/Home/Menuproducts.png"}); 
        await navigationPage.checkoutPage(); 
        await expect(page).toHaveURL('http://localhost:8080/checkout.html');
        await page.screenshot({path: "Evidencias/Home/Menucheckout.png"});

        console.log("Todas as páginas estão funcionando! \n");
  });

   test.afterAll(async ({ page }) => {
      await page.goto('http://localhost:8080/');
      await expect(page).toHaveURL('http://localhost:8080/');
      await page.screenshot({path: "Evidencias/login/AfterAll.png"});  
  });

});