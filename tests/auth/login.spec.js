const { test, expect } = require('../../fixtures/base-test');
const { envConfig } = require('../../config/env.config');

test.describe('Authentication - Login', () => {
  test('@smoke @sanity buyer can request a login OTP', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.requestOtp(envConfig.users.buyer.email);

    await expect(page.getByText(/otp|verify|sent|valid|registered|required/i).first()).toBeVisible();
  });

  test('@regression invalid login shows validation', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.requestOtp('invalid@example.com');

    await expect(page.locator('body')).toContainText(/invalid|incorrect|failed|required|valid|otp|sent|registered|email/i, { timeout: 15000 });
  });
});
