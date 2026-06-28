const { BasePage } = require('../base.page');

class AdminDashboardPage extends BasePage {
  async goto() {
    await super.goto('/admin/dashboard');
  }

  async openSection(sectionName) {
    await this.page.getByText(sectionName, { exact: false }).first().click();
  }

  async moderateReview(reviewText, action = 'Approve') {
    const row = this.page.getByRole('row').filter({ hasText: reviewText }).first();
    await row.getByRole('button', { name: action }).click();
  }

  async assertAdminModules() {
    for (const label of ['User Management', 'Seller Management', 'Agent Management', 'Lead Monitoring', 'Payment Monitoring']) {
      await this.assertVisible(this.page.getByText(label, { exact: false }).first());
    }
  }
}

module.exports = { AdminDashboardPage };
