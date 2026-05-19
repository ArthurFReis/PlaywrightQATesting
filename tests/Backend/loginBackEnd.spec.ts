import { test, expect } from "@playwright/test";

test.describe.parallel("API com paralelo", () => {
  test("Login correto", async ({ request, page }) => {

    const site = 'http://localhost:8080/';
    const response =    await request.post(`${site}/login.html`, {
    form: {
      'Username': 'valid_user',
      'Password': 'secret123'
    }
  });
  expect(response.status()).toBe(200);
  console.log('Login correto, status: ', response.status());

    });

test("Backend erro no login", async ({ request, page }) => {

    const site = 'http://localhost:8080/';
    const response =    await request.get(`${site}/login.html`, {
    form: {
      'username': 'valid_user',
      'password': 'secret123'
    }
  });
     expect(response.status()).toBe(200);

    });
    
test('Backend erro no usuário do login', async ({ request, page }) => {
       const site = 'http://localhost:8080';
  
        const response = await request.post(`${site}/login`, {
        form: {
            username: 'valid',
            password: 'secret123'
              }
  });
  expect(response.status()).toBe(200);
});

    });