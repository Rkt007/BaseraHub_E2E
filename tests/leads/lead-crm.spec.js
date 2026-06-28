const { test } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

test.describe('Lead Management Module', () => {
  test.skip(!process.env.OTP_CODE, 'Lead CRM requires an authenticated OTP session.');

  test('@regression seller can manage lead status and follow up', async ({ loginPage, leadCrmPage }) => {
    await loginAs(loginPage, 'seller');
    await leadCrmPage.goto();
    await leadCrmPage.openLeadInbox();
    await leadCrmPage.updateLeadStatus('QA Buyer', 'Contacted');
    await leadCrmPage.addFollowUp('QA Buyer', 'Automation follow-up reminder created.');
  });
});
