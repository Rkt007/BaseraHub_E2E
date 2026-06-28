const { BasePage } = require('../base.page');

class AgentDashboardPage extends BasePage {
  async goto() {
    await super.goto('/agent/dashboard');
  }

  async verifyAssignedProperty(propertyName, recommendation = 'Approve') {
    const row = this.page.getByRole('row').filter({ hasText: propertyName }).first();
    await row.locator('[data-testid="gps-verify"], button:has-text("GPS")').click();
    await row.locator('[data-testid="media-upload"], input[type="file"]').setInputFiles([]);
    await row.locator(`button:has-text("${recommendation}")`).click();
  }
}

module.exports = { AgentDashboardPage };
