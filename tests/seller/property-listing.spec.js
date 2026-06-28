const { test, expect } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');
const { buildProperty } = require('../../utils/data-builder');

test.describe('Seller Module - Property Listing Workflow', () => {
  test.skip(!process.env.OTP_CODE, 'Property listing requires an authenticated OTP session.');

  test('@regression seller can save draft and submit property for review', async ({
    loginPage,
    propertyListingPage,
    page
  }) => {
    await loginAs(loginPage, 'seller');
    await propertyListingPage.goto();
    await propertyListingPage.createDraft(buildProperty());
    await propertyListingPage.submitForReview();

    await expect(page.getByText(/submitted|under review|success/i).first()).toBeVisible();
  });
});
