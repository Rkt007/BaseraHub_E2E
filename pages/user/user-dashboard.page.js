const { BasePage } = require('../base.page');
const { dashboard } = require('../../locators/dashboard.locators');

class UserDashboardPage extends BasePage {
  async goto() {
    await super.goto('/dashboard');
  }

  async assertBuyerWidgets() {
    await this.assertVisible(this.page.locator(dashboard.myProfile).first());
    await this.assertVisible(this.page.locator(dashboard.favorites).first());
    await this.assertVisible(this.page.locator(dashboard.savedSearches).first());
    await this.assertVisible(this.page.locator(dashboard.notifications).first());
  }
}

module.exports = { UserDashboardPage };
