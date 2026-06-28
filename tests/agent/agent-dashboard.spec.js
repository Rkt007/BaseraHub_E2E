const { test, expect } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

test.describe('Agent Module', () => {
  test.skip(!process.env.OTP_CODE, 'Agent dashboard requires an authenticated OTP session.');

  test('@regression agent dashboard supports verification workflow', async ({ loginPage, agentDashboardPage, page }) => {
    await loginAs(loginPage, 'agent');
    await agentDashboardPage.goto();

    await expect(page.getByText(/assigned properties|property verification|gps verification/i).first()).toBeVisible();
  });
});
