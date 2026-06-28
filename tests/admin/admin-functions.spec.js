const { test, expect } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

test.describe('Admin Module', () => {
  test('@regression admin dashboard shows a not-found page for unauthenticated access', async ({ page, adminDashboardPage }) => {
    await adminDashboardPage.goto();

    await expect(page).toHaveURL(/admin\/dashboard/i, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/page not found|doesn't exist|go back home/i, { timeout: 15000 });
  });

  test('@regression admin dashboard exposes platform governance modules', async ({ loginPage, adminDashboardPage }) => {
    test.skip(!process.env.OTP_CODE, 'Admin dashboard requires an authenticated OTP session.');

    await loginAs(loginPage, 'admin');
    await adminDashboardPage.goto();

    await adminDashboardPage.assertAdminModules();
  });

  test('@regression admin dashboard shows monitoring and control areas', async ({ loginPage, adminDashboardPage, page }) => {
    test.skip(!process.env.OTP_CODE, 'Admin dashboard requires an authenticated OTP session.');

    await loginAs(loginPage, 'admin');
    await adminDashboardPage.goto();

    await expect(page.getByText(/lead monitoring|payment monitoring|user management/i).first()).toBeVisible({ timeout: 15000 });
  });
});
