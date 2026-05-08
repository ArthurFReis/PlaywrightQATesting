# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\checkout.spec.ts >> checkout >> cheout Unauthenticated
- Location: tests\FrontEnd\checkout.spec.ts:129:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#msg')
Expected: "User not authenticated"
Received: "Order placed successfully"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#msg')
    4 × locator resolved to <div id="msg" class="" role="status"></div>
      - unexpected value ""
    5 × locator resolved to <div id="msg" role="status" class="success">Order placed successfully</div>
      - unexpected value "Order placed successfully"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - heading "Checkout - ECM Marketplace" [level=1] [ref=e3]
  - navigation [ref=e4]:
    - link "Home" [ref=e5] [cursor=pointer]:
      - /url: index.html
    - link "Login" [ref=e6] [cursor=pointer]:
      - /url: login.html
    - link "Products" [ref=e7] [cursor=pointer]:
      - /url: products.html
    - link "Checkout" [ref=e8] [cursor=pointer]:
      - /url: checkout.html
  - generic [ref=e9]:
    - heading "Your Cart" [level=2] [ref=e10]
    - table [ref=e11]:
      - rowgroup [ref=e12]:
        - row "ID Name Price" [ref=e13]:
          - columnheader "ID" [ref=e14]
          - columnheader "Name" [ref=e15]
          - columnheader "Price" [ref=e16]
      - rowgroup [ref=e17]:
        - row "Your cart is empty. Browse products" [ref=e18]:
          - cell "Your cart is empty. Browse products" [ref=e19]:
            - text: Your cart is empty.
            - link "Browse products" [ref=e20] [cursor=pointer]:
              - /url: products.html
    - 'heading "Total: $0.00" [level=3] [ref=e22]'
    - button "Complete Order" [disabled] [ref=e23]
```

# Test source

```ts
  119 |         else {
  120 |             await page.click('#btnFinish'); 
  121 |         }
  122 |         let mensagem = await page.locator('#msg').textContent({timeout: 500});
  123 |         console.log("A mensagem recebida: \n",  mensagem);
  124 |         await expect(page.locator('#msg')).toHaveText('Order placed successfully');
  125 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder.png"});
  126 |           
  127 |     });
  128 |        
  129 |     test('cheout Unauthenticated', async ({ page }) => {
  130 |         let navigationPage = new NavegationPage(page);
  131 |         await navigationPage.loginPage();
  132 |         await localStorageLogin(page);
  133 |         //await page.close();
  134 | 
  135 |         let idProduto = [];
  136 |         let nomeProduto = [];
  137 |         let precoProduto = [];
  138 |         let id = 0;
  139 |         let ids = [1, 2, 3, 4, 5];
  140 |         let cartCount = 0;
  141 | 
  142 |         for (let i = 0; i < ids.length; i++) {
  143 |             id = ids[i];
  144 | 
  145 |             if(await page.locator(`[data-id="${id}"]`).isDisabled()) {
  146 |                 console.log(`O botão de adicionar ao carrinho do produto com ID ${id} está desabilitado!`);
  147 |             }
  148 |             
  149 |             switch (id) {
  150 |                 case 1:
  151 |                     await page.click(`[data-id="${id}"]`);
  152 |                     idProduto.push(id);
  153 |                     nomeProduto.push('Keyboard');
  154 |                     precoProduto.push(120.90);
  155 |                     cartCount = 1;
  156 |                     break;
  157 | 
  158 |                 case 2:
  159 |                     await page.click(`[data-id="${id}"]`);
  160 |                     idProduto.push(id);
  161 |                     nomeProduto.push('Mouse');
  162 |                     precoProduto.push(79.50);
  163 |                     cartCount = 1;    
  164 |                     break;
  165 | 
  166 |                 case 3:
  167 |                     await page.click(`[data-id="${id}"]`);
  168 |                     idProduto.push(id);
  169 |                     nomeProduto.push('Monitor');
  170 |                     precoProduto.push(1299.00);
  171 |                     break; 
  172 | 
  173 |                 case 4:
  174 |                     await page.click(`[data-id="${id}"]`);
  175 |                     idProduto.push(id);
  176 |                     nomeProduto.push('Headset');
  177 |                     precoProduto.push(240.00);
  178 |                     cartCount = 1;
  179 |                     break;
  180 | 
  181 |                 case 5:
  182 |                     await page.click(`[data-id="${id}"]`);
  183 |                     idProduto.push(id);
  184 |                     nomeProduto.push('Webcam');
  185 |                     precoProduto.push(320.00);
  186 |                     cartCount = 1;
  187 |                     break;
  188 | 
  189 |                 default:
  190 |                     console.log('Id do produto não encontrado, verifique o id do produto');
  191 |             }
  192 |         }
  193 |         
  194 |         await navigationPage.checkoutPage();
  195 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});
  196 | 
  197 |         let totalFinal: any = 0;
  198 |         let precoTotal: any = 0;
  199 | 
  200 |         for (let i = 0; i < precoProduto.length; i++) {
  201 |              precoTotal += precoProduto[i];
  202 |         }
  203 |         totalFinal = await page.locator('#total').textContent();
  204 | 
  205 |         if(precoTotal == totalFinal){
  206 |             console.log('O valor do total está correto! \n');
  207 |         }
  208 |         else{
  209 |             console.log('Existe alguma coisa errada na soma do(s) valore(s) do(s) preço(s) do(s) produto(s) \n');
  210 |         }
  211 | 
  212 |        let btnfinish = await page.locator('#btnFinish').isDisabled();
  213 |        if (btnfinish === true) {
  214 |             console.log('O botão de finalizar pedido está desabilitado');
  215 |         }
  216 |         else {
  217 |             await page.click('#btnFinish');
  218 |             await page.locator('#msg').textContent({timeout:500})
> 219 |             await expect(page.locator('#msg')).toHaveText('User not authenticated' );
      |                                                ^ Error: expect(locator).toHaveText(expected) failed
  220 |         }
  221 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder2.png"});
  222 |         
  223 |     }); 
  224 |  
  225 | });
```