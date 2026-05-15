import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';
import { AdicionarProdutosnoCarrinho } from '../../app/Comum/Products/products';
import { pageResponsivoProducts } from '../../app/Comum/Products/products';
import { testeBotoesMenuProducts } from '../../app/Comum/Products/products';


test.beforeEach(async ({ page }) => {
     let browser = await webkit.launch();
     let context = await browser.newContext();
     await page.goto('http://localhost:8080/products.html');
     await expect(page).toHaveURL('http://localhost:8080/products.html');
    //await page.screenshot({path: "Evidencias/Products/BeforeEach.png"});
  });

test.describe.parallel('Products', () => {

    test('Products Responsivo', async ({ page }) => {
        let navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await pageResponsivoProducts(page);
    });

    test('Menu', async ({ page }) => {
        let navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await testeBotoesMenuProducts(page);
          });

    test('products pesquisa pelo nome completo correto', async ({ page }) => {
        let pesquisas = {"pesquisar": ["mouse", "mou", "banha de porco", ""]};
        let navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        for(let pesquisa in pesquisas.pesquisar) {
            await page.getByPlaceholder('Search products by name...').clear()
            await page.getByPlaceholder('Search products by name...').fill(pesquisas.pesquisar[pesquisa], {timeout:400});
            await page.screenshot({path: `Evidencias/Products/FormasdePesquisarProdutos${pesquisas.pesquisar[pesquisa]}.png`});
        }
        console.log('Pesquisa com sucesso!')
    });

    test('products adicionar produto no carrinho', async ({ page }) => {
        let navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await AdicionarProdutosnoCarrinho(page);
    });

    test('products adicionar produto no carrinho e dar um refresh', async ({ page }) => {
        let navigationPage = new NavegationPage(page);
        await navigationPage.productsPage();
        await AdicionarProdutosnoCarrinho(page);
        await page.reload();
        let valorCart = await page.locator('#cart-count').innerText();
        console.log("\n O valor do carrinho depois do refresh é: ", valorCart);
    });

});