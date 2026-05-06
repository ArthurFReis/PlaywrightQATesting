import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';


test.beforeEach(async ({ page }) => {
         const browser = await webkit.launch();
         const context = await browser.newContext();
         await page.goto('http://localhost:8080/');
         await expect(page).toHaveURL('http://localhost:8080/');
         await page.screenshot({path: "Evidencias/Home/BeforeEach.png"});
  });

  
test.describe.parallel('Login', () => {
  test('Comparar screenshot responsivo', async ({ page }) => {

    let tamanhos = {"width": [375,414,390,430], "height": [667,896,844,932]};
    for(const tamanho in tamanhos.width){
      await page.setViewportSize({ width: tamanhos.width[tamanho], height: tamanhos.height[tamanho]});
      await page.goto('http://localhost:8080/');
      await expect(page).toHaveURL('http://localhost:8080/');
      await page.screenshot({path: `Evidencias/Home/home-mobile${tamanhos.width[tamanho]}.png`});
      await page.screenshot({path: `Evidencias/Home/home-mobile2${tamanhos.height[tamanho]}.png`});
    
  }
  console.log("É responsivo! \n");
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