# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\BackEnd\status.spec.ts >> API com paralelo >> Bancos em geral
- Location: tests\BackEnd\status.spec.ts:8:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#username')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe.parallel("API com paralelo", () => {
  4  |      
  5  |     const site = 'http://localhost:8080/'
  6  | 
  7  | 
  8  |     test("Bancos em geral", async({request, page}) => {
  9  |         const response = await request.get(`${site}/login`);
> 10 |         await page.locator('#username').fill('valid_user');
     |                                         ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  11 |         await page.locator('#password').fill('secret123');
  12 |         await page.locator('#btnLogin').click();
  13 |         expect(response.status()).toBe(200);
  14 |         console.log(response.text());
  15 |         
  16 |     });
  17 | 
  18 |     test("Bancos em geral a validação errada", async({request , page}) => {
  19 |         const response = await request.get(`${site}/products`);
  20 |         expect(response.status()).toBe(400);
  21 |     });
  22 | 
  23 |         test("banco com o código = 1 e imprimir o valor do status", async({request, page}) => {
  24 |         const response = await request.get(`${site}/cheout`);
  25 |         console.log(response.status());
  26 |         //expect(response.status()).toBe(200);
  27 |     });
  28 | 
  29 | });
```