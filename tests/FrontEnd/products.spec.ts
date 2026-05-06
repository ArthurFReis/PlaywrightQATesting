import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';
import { AdicionarProdutosnoCarrinho } from '../../app/Comum/Products/products';


test.beforeEach(async ({ page }) => {
     const browser = await webkit.launch();
     const context = await browser.newContext();
    await page.goto('http://localhost:8080/products.html');
    await expect(page).toHaveURL('http://localhost:8080/products.html');
    //await page.screenshot({path: "Evidencias/Products/BeforeEach.png"});
  });

test.describe.parallel('Products', () => {

    test('products pesquisa pelo nome completo correto', async ({ page }) => {
        let pesquisas = {"pesquisar": ["mouse", "mou", "banha de porco", ""]};
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        for(const pesquisa in pesquisas.pesquisar) {
            await page.getByPlaceholder('Search products by name...').clear()
            await page.getByPlaceholder('Search products by name...').fill(pesquisas.pesquisar[pesquisa], {timeout:400});
            await page.screenshot({path: `Evidencias/Products/FormasdePesquisarProdutos${pesquisas.pesquisar[pesquisa]}.png`});
        }
        console.log('Pesquisa com sucesso!')
    });

    test('products adicionar produto no carrinho', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await AdicionarProdutosnoCarrinho(page);
    });

});