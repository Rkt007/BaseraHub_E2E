const { test } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

const { expect } = require('@playwright/test');

test.describe('User Module - Buyer Dashboard', () => {
  test('@regression buyer dashboard redirects unauthenticated users to login', async ({ page, userDashboardPage }) => {
    await userDashboardPage.goto();

    await expect(page).toHaveURL(/login|signin|auth/i, { timeout: 15000 });
  });

  test('@regression buyer dashboard shows saved activity widgets', async ({ loginPage, userDashboardPage }) => {
    test.skip(!process.env.OTP_CODE, 'Buyer dashboard requires an authenticated OTP session.');

    await loginAs(loginPage, 'buyer');
    await userDashboardPage.goto();

    await userDashboardPage.assertBuyerWidgets();
  });

  test('@regression buyer dashboard exposes profile and saved content links', async ({ loginPage, userDashboardPage, page }) => {
    test.skip(!process.env.OTP_CODE, 'Buyer dashboard requires an authenticated OTP session.');

    await loginAs(loginPage, 'buyer');
    await userDashboardPage.goto();

    await expect(page.getByText(/my profile|favorites|saved searches|notifications/i).first()).toBeVisible({ timeout: 15000 });
  });
});
