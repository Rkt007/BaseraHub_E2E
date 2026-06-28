const { test } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

test.describe('Notification Module', () => {
  test.skip(!process.env.OTP_CODE, 'Notifications require an authenticated OTP session.');

  test('@regression user can view notification channels', async ({ loginPage, notificationPage }) => {
    await loginAs(loginPage, 'buyer');
    await notificationPage.goto();

    await notificationPage.assertChannelPreferences();
  });
});
