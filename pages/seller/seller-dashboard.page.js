const { BasePage } = require('../base.page');
const { seller } = require('../../locators/dashboard.locators');

class SellerDashboardPage extends BasePage {
  async goto() {
    await super.goto('/seller/dashboard');
  }

  async assertSellerWidgets() {
    await this.assertVisible(this.page.locator(seller.myProperties).first());
    await this.assertVisible(this.page.locator(seller.leads).first());
    await this.assertVisible(this.page.locator(seller.myRequests).first());
  }
}

module.exports = { SellerDashboardPage };
