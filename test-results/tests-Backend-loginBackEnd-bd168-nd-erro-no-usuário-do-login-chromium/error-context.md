# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Backend\loginBackEnd.spec.ts >> API com paralelo >> Backend erro no usuário do login
- Location: tests\Backend\loginBackEnd.spec.ts:31:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe.parallel("API com paralelo", () => {
  4  |   test("Login correto", async ({ request, page }) => {
  5  | 
  6  |     const site = 'http://localhost:8080/';
  7  |     const response =    await request.post(`${site}/login.html`, {
  8  |     form: {
  9  |       'Username': 'valid_user',
  10 |       'Password': 'secret123'
  11 |     }
  12 |   });
  13 |   expect(response.status()).toBe(200);
  14 |   console.log('Login correto, status: ', response.status());
  15 | 
  16 |     });
  17 | 
  18 | test("Backend erro no login", async ({ request, page }) => {
  19 | 
  20 |     const site = 'http://localhost:8080/';
  21 |     const response =    await request.get(`${site}/login.html`, {
  22 |     form: {
  23 |       'username': 'valid_user',
  24 |       'password': 'secret123'
  25 |     }
  26 |   });
  27 |      expect(response.status()).toBe(200);
  28 | 
  29 |     });
  30 |     
  31 |     test('Backend erro no usuário do login', async ({ request, page }) => {
  32 |        const site = 'http://localhost:8080';
  33 |   
  34 |         const response = await request.post(`${site}/login`, {
  35 |         form: {
  36 |             username: 'valid',
  37 |             password: 'secret123'
  38 |               }
  39 |   });
> 40 |   expect(response.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  41 | });
  42 | 
  43 |     });
```