import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';
import { pageResponsivoHome } from '../../app/Comum/Home/home';
import { testeBotoesMenuHome } from '../../app/Comum/Home/home';

test.beforeEach(async ({ page }) => {
         const browser = await webkit.launch();
         const context = await browser.newContext();
         await page.goto('http://localhost:8080/index.html');
         await expect(page).toHaveURL('http://localhost:8080/index.html');
         await page.screenshot({path: "Evidencias/Home-Index/BeforeEach.png"});
  });

test.describe.parallel('Login', () => {

test('Home Responsivo', async ({ page }) => {
  await page.goto('http://localhost:8080/index.html');
  await expect(page).toHaveURL('http://localhost:8080/index.html');
  await pageResponsivoHome(page);   
});

test('Menu', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');
    await expect(page).toHaveURL('http://localhost:8080/index.html');
    await testeBotoesMenuHome(page);
  });

   test.afterAll(async ({ page }) => {
      await page.goto('http://localhost:8080/index.html');
      await expect(page).toHaveURL('http://localhost:8080/index.html');
      await page.screenshot({path: "Evidencias/Home-Index/AfterAll.png"});  
  });

});

