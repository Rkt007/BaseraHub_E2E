const { test } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

test.describe('Boost Property Module', () => {
  test.skip(!process.env.OTP_CODE, 'Boost property requires an authenticated OTP session.');

  test('@regression seller can boost listing and view analytics', async ({ loginPage, boostPropertyPage }) => {
    await loginAs(loginPage, 'seller');
    await boostPropertyPage.goto();
    await boostPropertyPage.boostFirstProperty();
    await boostPropertyPage.assertAnalyticsVisible();
  });
});
