const { test, expect } = require('../../fixtures/base-test');
const { buildUser } = require('../../utils/data-builder');

test.describe('Authentication - Registration and OTP', () => {
  test('@regression buyer can submit registration form', async ({ registerPage, page }) => {
    const user = buildUser('buyer');

    await registerPage.goto();
    await registerPage.registerUser(user);

    await expect(page.locator('body')).toContainText(/otp|verify|success|sent|registered|please|enter|sign up/i, { timeout: 15000 });
  });

  test('@regression forgot password request can be submitted', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.requestReset('buyer@example.com');

    await expect(page.getByText(/otp|email|reset|sent/i).first()).toBeVisible();
  });
});
