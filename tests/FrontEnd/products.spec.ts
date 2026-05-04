import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';

test.beforeEach(async ({ page }) => {
     const browser = await webkit.launch();
         const context = await browser.newContext();
         await page.goto('http://localhost:8080/');
         await expect(page).toHaveURL('http://localhost:8080/');
         await page.screenshot({path: "Evidencias/Products/BeforeEach.png"});
  });

test.describe.parallel('Products', () => {

    test('products pesquisa pelo nome completo correto', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await page.getByPlaceholder('Search products by name...').fill('Mouse')
        await page.screenshot({path: "Evidencias/Products/PesquisaMouseCorreto.png"});
    });

    test('products pesquisa pela metade do nome', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await page.getByPlaceholder('Search products by name...').fill('Mou')
        await page.screenshot({path: "Evidencias/Products/PesquisaMetadeNome.png"});
    });

    test('products pesquisa pelo produto que não existe no catalogo', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await page.getByPlaceholder('Search products by name...').fill('banha')
        await page.screenshot({path: "Evidencias/Products/PesquisaProdutoNaoExisteCatalogo.png"});
    });

    test('products adicionar produto no carrinho', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await page.locator('[data-id="2"]').click();
        await page.screenshot({path: "Evidencias/Products/AdicionarProdutoCart.png"});
    });

});