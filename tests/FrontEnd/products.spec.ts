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

        let idProduto = [];
        let nomeProduto = [];
        let precoProduto = [];
        let id = 0;
        let ids = [1, 2, 3, 4, 5];
        let cartCount = 0;


        for (let i = 0; i < ids.length; i++) {
            id = ids[i];

            if(await page.locator(`[data-id="${id}"]`).isDisabled()) {
                console.log(`O botão de adicionar ao carrinho do produto com ID ${id} está desabilitado!`);
            }
            

            switch (id) {
                case 1:
                    await page.click(`[data-id="${id}"]`);
                    idProduto.push(id);
                    nomeProduto.push('Keyboard');
                    precoProduto.push(120.90);
                    cartCount = 1;
                    break;

                case 2:
                    await page.click(`[data-id="${id}"]`);
                    idProduto.push(id);
                    nomeProduto.push('Mouse');
                    precoProduto.push(79.50);
                    cartCount = 1;    
                    break;

                case 3:
                    await page.click(`[data-id="${id}"]`);
                    idProduto.push(id);
                    nomeProduto.push('Monitor');
                    precoProduto.push(1299.00);
                    break; 

                case 4:
                    await page.click(`[data-id="${id}"]`);
                    idProduto.push(id);
                    nomeProduto.push('Headset');
                    precoProduto.push(240.00);
                    cartCount = 1;
                    break;

                case 5:
                    await page.click(`[data-id="${id}"]`);
                    idProduto.push(id);
                    nomeProduto.push('Webcam');
                    precoProduto.push(320.00);
                    cartCount = 1;
                    break;

                default:
                    console.log('Id do produto não encontrado, verifique o id do produto');
            }
        }

        console.log('Todos os botões estão ativados \n');

        for (let i = 0; i < idProduto.length; i++) {
            console.log(`Produto adicionado ao carrinho: ID: ${idProduto[i]}, Nome: ${nomeProduto[i]}, Preço: R$${precoProduto[i]}, Quantidade: ${cartCount}`);
        }
        console.log('\n O valor do cart é:', await page.locator('#cart-count').textContent());
        await page.screenshot({path: "Evidencias/Products/AdicionarProdutoCart.png"});
    });

});