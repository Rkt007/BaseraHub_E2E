const { test, expect } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

test.describe('AI Recommendation Engine', () => {
  test.skip(!process.env.OTP_CODE, 'Recommendations require an authenticated OTP session.');

  test('@regression buyer sees recommended properties based on behavior', async ({ loginPage, page }) => {
    await loginAs(loginPage, 'buyer');
    await page.goto('/recommendations');

    await expect(page.getByText(/recommended|matching properties|because you viewed/i).first()).toBeVisible();
  });

  test('@regression seller sees potential buyer recommendations', async ({ loginPage, page }) => {
    await loginAs(loginPage, 'seller');
    await page.goto('/seller/recommendations');

    await expect(page.getByText(/potential buyers|recommended buyers|buyer matches/i).first()).toBeVisible();
  });
});
