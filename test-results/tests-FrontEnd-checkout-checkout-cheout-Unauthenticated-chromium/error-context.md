# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\checkout.spec.ts >> checkout >> cheout Unauthenticated
- Location: tests\FrontEnd\checkout.spec.ts:115:9

# Error details

```
Error: locator.isDisabled: Target page, context or browser has been closed
```

# Test source

```ts
  31  |         for (let i = 0; i < ids.length; i++) {
  32  |             id = ids[i];
  33  | 
  34  |             if(await page.locator(`[data-id="${id}"]`).isDisabled()) {
  35  |                 console.log(`O botão de adicionar ao carrinho do produto com ID ${id} está desabilitado!`);
  36  |             }
  37  |             
  38  |             switch (id) {
  39  |                 case 1:
  40  |                     await page.click(`[data-id="${id}"]`);
  41  |                     idProduto.push(id);
  42  |                     nomeProduto.push('Keyboard');
  43  |                     precoProduto.push(120.90);
  44  |                     cartCount = 1;
  45  |                     break;
  46  | 
  47  |                 case 2:
  48  |                     await page.click(`[data-id="${id}"]`);
  49  |                     idProduto.push(id);
  50  |                     nomeProduto.push('Mouse');
  51  |                     precoProduto.push(79.50);
  52  |                     cartCount = 1;    
  53  |                     break;
  54  | 
  55  |                 case 3:
  56  |                     await page.click(`[data-id="${id}"]`);
  57  |                     idProduto.push(id);
  58  |                     nomeProduto.push('Monitor');
  59  |                     precoProduto.push(1299.00);
  60  |                     break; 
  61  | 
  62  |                 case 4:
  63  |                     await page.click(`[data-id="${id}"]`);
  64  |                     idProduto.push(id);
  65  |                     nomeProduto.push('Headset');
  66  |                     precoProduto.push(240.00);
  67  |                     cartCount = 1;
  68  |                     break;
  69  | 
  70  |                 case 5:
  71  |                     await page.click(`[data-id="${id}"]`);
  72  |                     idProduto.push(id);
  73  |                     nomeProduto.push('Webcam');
  74  |                     precoProduto.push(320.00);
  75  |                     cartCount = 1;
  76  |                     break;
  77  | 
  78  |                 default:
  79  |                     console.log('Id do produto não encontrado, verifique o id do produto');
  80  |             }
  81  |         } 
  82  |         
  83  |         await navigationPage.checkoutPage();
  84  |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});
  85  | 
  86  |         let totalFinal: any = 0;
  87  |         let precoTotal: any = 0;
  88  | 
  89  |         for (let i = 0; i < precoProduto.length; i++) {
  90  |              precoTotal += precoProduto[i];
  91  |         }
  92  |         totalFinal = await page.locator('#total').textContent();
  93  | 
  94  |         if(precoTotal == totalFinal){
  95  |             console.log('O valor do total está correto! \n');
  96  |         }
  97  |         else{
  98  |             console.log('Existe alguma coisa errada na soma do(s) valore(s) do(s) preço(s) do(s) produto(s) \n');
  99  |         }
  100 | 
  101 |        const btnfinish = await page.locator('#btnFinish').isDisabled();
  102 |        if (btnfinish === true) {
  103 |             console.log('O botão de finalizar pedido está desabilitado');
  104 |         }
  105 |         else {
  106 |             await page.click('#btnFinish');
  107 |             await page.locator('#msg').textContent({timeout: 500})
  108 |             await expect(page.locator('#msg')).toHaveText('Order placed successfully');
  109 |         }
  110 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder.png"});
  111 | 
  112 |         
  113 |     });
  114 |        
  115 |     test('cheout Unauthenticated', async ({ page }) => {
  116 |         const navigationPage = new NavegationPage(page);
  117 |         await navigationPage.loginPage();
  118 |         await localStorageLogin(page);
  119 |         await page.close();
  120 | 
  121 |         let idProduto = [];
  122 |         let nomeProduto = [];
  123 |         let precoProduto = [];
  124 |         let id = 0;
  125 |         let ids = [1, 2, 3, 4, 5];
  126 |         let cartCount = 0;
  127 | 
  128 |         for (let i = 0; i < ids.length; i++) {
  129 |             id = ids[i];
  130 | 
> 131 |             if(await page.locator(`[data-id="${id}"]`).isDisabled()) {
      |                                                        ^ Error: locator.isDisabled: Target page, context or browser has been closed
  132 |                 console.log(`O botão de adicionar ao carrinho do produto com ID ${id} está desabilitado!`);
  133 |             }
  134 |             
  135 |             switch (id) {
  136 |                 case 1:
  137 |                     await page.click(`[data-id="${id}"]`);
  138 |                     idProduto.push(id);
  139 |                     nomeProduto.push('Keyboard');
  140 |                     precoProduto.push(120.90);
  141 |                     cartCount = 1;
  142 |                     break;
  143 | 
  144 |                 case 2:
  145 |                     await page.click(`[data-id="${id}"]`);
  146 |                     idProduto.push(id);
  147 |                     nomeProduto.push('Mouse');
  148 |                     precoProduto.push(79.50);
  149 |                     cartCount = 1;    
  150 |                     break;
  151 | 
  152 |                 case 3:
  153 |                     await page.click(`[data-id="${id}"]`);
  154 |                     idProduto.push(id);
  155 |                     nomeProduto.push('Monitor');
  156 |                     precoProduto.push(1299.00);
  157 |                     break; 
  158 | 
  159 |                 case 4:
  160 |                     await page.click(`[data-id="${id}"]`);
  161 |                     idProduto.push(id);
  162 |                     nomeProduto.push('Headset');
  163 |                     precoProduto.push(240.00);
  164 |                     cartCount = 1;
  165 |                     break;
  166 | 
  167 |                 case 5:
  168 |                     await page.click(`[data-id="${id}"]`);
  169 |                     idProduto.push(id);
  170 |                     nomeProduto.push('Webcam');
  171 |                     precoProduto.push(320.00);
  172 |                     cartCount = 1;
  173 |                     break;
  174 | 
  175 |                 default:
  176 |                     console.log('Id do produto não encontrado, verifique o id do produto');
  177 |             }
  178 |         }
  179 |         
  180 |         await navigationPage.checkoutPage();
  181 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});
  182 | 
  183 |         let totalFinal: any = 0;
  184 |         let precoTotal: any = 0;
  185 | 
  186 |         for (let i = 0; i < precoProduto.length; i++) {
  187 |              precoTotal += precoProduto[i];
  188 |         }
  189 |         totalFinal = await page.locator('#total').textContent();
  190 | 
  191 |         if(precoTotal == totalFinal){
  192 |             console.log('O valor do total está correto! \n');
  193 |         }
  194 |         else{
  195 |             console.log('Existe alguma coisa errada na soma do(s) valore(s) do(s) preço(s) do(s) produto(s) \n');
  196 |         }
  197 | 
  198 |        const btnfinish = await page.locator('#btnFinish').isDisabled();
  199 |        if (btnfinish === true) {
  200 |             console.log('O botão de finalizar pedido está desabilitado');
  201 |         }
  202 |         else {
  203 |             await page.click('#btnFinish');
  204 |             await page.locator('#msg').textContent({timeout:500})
  205 |             await expect(page.locator('#msg')).toHaveText('User not authenticated' );
  206 |         }
  207 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder2.png"});
  208 |         
  209 |     }); 
  210 |  
  211 | });
```