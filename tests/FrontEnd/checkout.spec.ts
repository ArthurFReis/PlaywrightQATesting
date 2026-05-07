import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';
import { realizarLogin } from '../../app/Comum/Login/login';
import { localStorageLogin } from '../../app/Comum/Login/login';
import { pageResponsivoCheckout } from '../../app/Comum/Checkout/checkout';
import { testeBotoesMenuCheckout } from '../../app/Comum/Checkout/checkout';



test.beforeEach(async ({ page }) => {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  await page.goto('http://localhost:8080/checkout.html');
  await expect(page).toHaveURL('http://localhost:8080/checkout.html');
  
  //await page.screenshot({path: "Evidencias/Checkout/BeforeEach.png"});
  });

test.describe.parallel('checkout', () => {

     test('Checkout Responsivo', async ({ page }) => {
            const navigationPage = new NavegationPage(page);
            await navigationPage.checkoutPage();
            await pageResponsivoCheckout(page);
        });

        test('Menu', async ({ page }) => {
                const navigationPage = new NavegationPage(page);
                await navigationPage.checkoutPage();
                await testeBotoesMenuCheckout(page);
                  });

    test('cheout Authenticated', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.loginPage();
        await realizarLogin(page);
       
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
        
        await navigationPage.checkoutPage();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});

        let totalFinal: any = 0;
        let precoTotal: any = 0;

        for (let i = 0; i < precoProduto.length; i++) {
             precoTotal += precoProduto[i];
        }
        totalFinal = await page.locator('#total').textContent();

        if(precoTotal == totalFinal){
            console.log('O valor do total está correto! \n');
        }
        else{
            console.log('Existe alguma coisa errada na soma do(s) valore(s) do(s) preço(s) do(s) produto(s) \n');
        }

       const btnfinish = await page.locator('#btnFinish').isDisabled();
       if (btnfinish === true) {
            console.log('O botão de finalizar pedido está desabilitado');
        }
        else {
            await page.click('#btnFinish'); 
        }
        const mensagem = await page.locator('#msg').textContent({timeout: 500});
        console.log("A mensagem recebida: \n",  mensagem);
        await expect(page.locator('#msg')).toHaveText('Order placed successfully');
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder.png"});
          
    });
       
    test('cheout Unauthenticated', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.loginPage();
        await localStorageLogin(page);
        await page.close();

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
        
        await navigationPage.checkoutPage();
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});

        let totalFinal: any = 0;
        let precoTotal: any = 0;

        for (let i = 0; i < precoProduto.length; i++) {
             precoTotal += precoProduto[i];
        }
        totalFinal = await page.locator('#total').textContent();

        if(precoTotal == totalFinal){
            console.log('O valor do total está correto! \n');
        }
        else{
            console.log('Existe alguma coisa errada na soma do(s) valore(s) do(s) preço(s) do(s) produto(s) \n');
        }

       const btnfinish = await page.locator('#btnFinish').isDisabled();
       if (btnfinish === true) {
            console.log('O botão de finalizar pedido está desabilitado');
        }
        else {
            await page.click('#btnFinish');
            await page.locator('#msg').textContent({timeout:500})
            await expect(page.locator('#msg')).toHaveText('User not authenticated' );
        }
        await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder2.png"});
        
    }); 
 
});