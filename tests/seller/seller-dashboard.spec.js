const { test, expect } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

test.describe('Seller Module - Dashboard', () => {
  test('@regression seller dashboard shows a not-found page for unauthenticated access', async ({ page, sellerDashboardPage }) => {
    await sellerDashboardPage.goto();

    await expect(page).toHaveURL(/seller\/dashboard/i, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/page not found|doesn't exist|go back home/i, { timeout: 15000 });
  });

  test('@regression seller dashboard shows property and lead actions', async ({ loginPage, sellerDashboardPage }) => {
    test.skip(!process.env.OTP_CODE, 'Seller dashboard requires an authenticated OTP session.');

    await loginAs(loginPage, 'seller');
    await sellerDashboardPage.goto();

    await sellerDashboardPage.assertSellerWidgets();
  });

  test('@regression seller dashboard exposes core management sections', async ({ loginPage, sellerDashboardPage, page }) => {
    test.skip(!process.env.OTP_CODE, 'Seller dashboard requires an authenticated OTP session.');

    await loginAs(loginPage, 'seller');
    await sellerDashboardPage.goto();

    await expect(page.getByText(/my properties|my requests|leads/i).first()).toBeVisible({ timeout: 15000 });
  });
});
