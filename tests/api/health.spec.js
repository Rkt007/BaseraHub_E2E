const { test, expect } = require('@playwright/test');

test.describe('API Health', () => {
  test('@smoke public site responds successfully', async ({ request, baseURL }) => {
    const response = await request.get(baseURL);
    expect(response.status()).toBeLessThan(500);
  });
});
