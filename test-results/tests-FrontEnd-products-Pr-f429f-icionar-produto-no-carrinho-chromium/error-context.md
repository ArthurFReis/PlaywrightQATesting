# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\products.spec.ts >> Products >> products adicionar produto no carrinho
- Location: tests\FrontEnd\products.spec.ts:42:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "0"
Received: "5"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - heading "Products - ECM Marketplace" [level=1] [ref=e3]
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
    - heading "Product Catalog" [level=2] [ref=e10]
    - generic [ref=e11]:
      - text: "Cart:"
      - strong [ref=e12]: "5"
      - text: items
    - textbox "Search products by name..." [ref=e14]
    - table [ref=e15]:
      - rowgroup [ref=e16]:
        - row "ID Name Price Actions" [ref=e17]:
          - columnheader "ID" [ref=e18]
          - columnheader "Name" [ref=e19]
          - columnheader "Price" [ref=e20]
          - columnheader "Actions" [ref=e21]
      - rowgroup [ref=e22]:
        - row "1 Keyboard $120.90 Add to Cart" [ref=e23]:
          - cell "1" [ref=e24]
          - cell "Keyboard" [ref=e25]
          - cell "$120.90" [ref=e26]
          - cell "Add to Cart" [ref=e27]:
            - button "Add to Cart" [ref=e28] [cursor=pointer]
        - row "2 Mouse $79.50 Add to Cart" [ref=e29]:
          - cell "2" [ref=e30]
          - cell "Mouse" [ref=e31]
          - cell "$79.50" [ref=e32]
          - cell "Add to Cart" [ref=e33]:
            - button "Add to Cart" [ref=e34] [cursor=pointer]
        - row "3 Monitor $1299.00 Add to Cart" [ref=e35]:
          - cell "3" [ref=e36]
          - cell "Monitor" [ref=e37]
          - cell "$1299.00" [ref=e38]
          - cell "Add to Cart" [ref=e39]:
            - button "Add to Cart" [ref=e40] [cursor=pointer]
        - row "4 Headset $240.00 Add to Cart" [ref=e41]:
          - cell "4" [ref=e42]
          - cell "Headset" [ref=e43]
          - cell "$240.00" [ref=e44]
          - cell "Add to Cart" [ref=e45]:
            - button "Add to Cart" [ref=e46] [cursor=pointer]
        - row "5 Webcam $320.00 Add to Cart" [ref=e47]:
          - cell "5" [ref=e48]
          - cell "Webcam" [ref=e49]
          - cell "$320.00" [ref=e50]
          - cell "Add to Cart" [ref=e51]:
            - button "Add to Cart" [ref=e52] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect, webkit } from '@playwright/test';
  2  | import { NavegationPage } from './navegationPage';
  3  | import { AdicionarProdutosnoCarrinho } from '../../app/Comum/Products/products';
  4  | import { pageResponsivoProducts } from '../../app/Comum/Products/products';
  5  | import { testeBotoesMenuProducts } from '../../app/Comum/Products/products';
  6  | 
  7  | 
  8  | test.beforeEach(async ({ page }) => {
  9  |      let browser = await webkit.launch();
  10 |      let context = await browser.newContext();
  11 |      await page.goto('http://localhost:8080/products.html');
  12 |      await expect(page).toHaveURL('http://localhost:8080/products.html');
  13 |     //await page.screenshot({path: "Evidencias/Products/BeforeEach.png"});
  14 |   });
  15 | 
  16 | test.describe.parallel('Products', () => {
  17 | 
  18 |     test('Products Responsivo', async ({ page }) => {
  19 |         let navigationPage = new NavegationPage(page);
  20 |         await navigationPage.productsPage();
  21 |         await pageResponsivoProducts(page);
  22 |     });
  23 | 
  24 |     test('Menu', async ({ page }) => {
  25 |         let navigationPage = new NavegationPage(page);
  26 |         await navigationPage.productsPage();
  27 |         await testeBotoesMenuProducts(page);
  28 |           });
  29 | 
  30 |     test('products pesquisa pelo nome completo correto', async ({ page }) => {
  31 |         let pesquisas = {"pesquisar": ["mouse", "mou", "banha de porco", ""]};
  32 |         let navigationPage = new NavegationPage(page);
  33 |         await navigationPage.productsPage();
  34 |         for(let pesquisa in pesquisas.pesquisar) {
  35 |             await page.getByPlaceholder('Search products by name...').clear()
  36 |             await page.getByPlaceholder('Search products by name...').fill(pesquisas.pesquisar[pesquisa], {timeout:400});
  37 |             await page.screenshot({path: `Evidencias/Products/FormasdePesquisarProdutos${pesquisas.pesquisar[pesquisa]}.png`});
  38 |         }
  39 |         console.log('Pesquisa com sucesso!')
  40 |     });
  41 | 
  42 |     test('products adicionar produto no carrinho', async ({ page }) => {
  43 |         let navigationPage = new NavegationPage(page);
  44 |         await navigationPage.productsPage();
  45 |         await AdicionarProdutosnoCarrinho(page);
  46 |         await page.reload();
  47 |         let valorCart = await page.locator('#cart-count').innerText();
> 48 |         await expect(valorCart).toBe('0');
     |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  49 |         console.log("\n O valor do carrinho depois do refresh é: ", valorCart);
  50 |     });
  51 | 
  52 | 
  53 | });
```