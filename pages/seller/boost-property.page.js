const { BasePage } = require('../base.page');

class BoostPropertyPage extends BasePage {
  async goto() {
    await super.goto('/seller/boost');
  }

  async boostFirstProperty() {
    await this.page.locator('[data-testid="property-boost-card"]').first().locator('button:has-text("Boost"), [data-testid="boost-property"]').click();
  }

  async assertAnalyticsVisible() {
    await this.assertVisible(this.page.getByText('Impressions', { exact: false }).first());
    await this.assertVisible(this.page.getByText('Clicks', { exact: false }).first());
    await this.assertVisible(this.page.getByText('Leads Generated', { exact: false }).first());
  }
}

module.exports = { BoostPropertyPage };
