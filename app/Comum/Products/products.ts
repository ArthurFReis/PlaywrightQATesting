import { Page, expect } from '@playwright/test'; 


export async function pageResponsivoProducts(page: Page) {
    let tamanhos = {"nomes": ["iPhone_SE", "iPhone_XR", "iPhone_12_Pro", "iPhone_14_Pro_Max"], "width": [375,414,390,430], "height": [667,896,844,932]};
    for(const tamanho in tamanhos.width){
      await page.setViewportSize({ width: tamanhos.width[tamanho], height: tamanhos.height[tamanho]});
      await page.screenshot({path: `Evidencias/Products/Responsivo/home-mobile-${tamanhos.nomes[tamanho]}.png`});
    }
     console.log("É responsivo! \n");
}

export async function AdicionarProdutosnoCarrinho(page: Page) {
        let idProduto = [];
        let nomeProduto = [];
        let precoProduto = [];
        let id = 0;
        let ids = [1, 2, 3, 4, 5];
        let cartCount = 0;
        const stateBefore = await page.evaluate(() => JSON.stringify(window.localStorage));

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

            const stateAfter = await page.evaluate(() => JSON.stringify(window.localStorage));
            expect(stateBefore).not.toBe(stateAfter)
            console.log('Antes: \n', stateBefore);
            console.log('Depois: \n', stateAfter);
        }


        console.log('Todos os botões estão ativados \n');

        for (let i = 0; i < idProduto.length; i++) {
            console.log(`Produto adicionado ao carrinho: ID: ${idProduto[i]}, Nome: ${nomeProduto[i]}, Preço: R$${precoProduto[i]}, Quantidade: ${cartCount}`);
        }
        console.log('\n O valor do cart é:', await page.locator('#cart-count').textContent());
        await page.screenshot({path: "Evidencias/Products/AdicionarProdutoCart.png"});
    }

    export async function testeBotoesMenuProducts(page: Page) {
        const menuButtons = {"ids":['#nav-home', '#nav-login', '#nav-products', '#nav-checkout']};
        for( var id in menuButtons.ids){
          if((await page.locator(menuButtons.ids[id]).isEnabled()) && (await page.locator(menuButtons.ids[id]).isDisabled())){
            console.log("O botão está invisivel ou está desabilitado!")
          }
          else {
               await page.locator(menuButtons.ids[id]).click();
               await page.screenshot({path: `Evidencias/Products/Menu/menu-${menuButtons.ids[id]}.png`});
          }
      }
        console.log("Todas as páginas estão funcionando! \n");
}