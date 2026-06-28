const { BasePage } = require('../base.page');

class NotificationPage extends BasePage {
  async goto() {
    await super.goto('/notifications');
  }

  async assertChannelPreferences() {
    await this.assertVisible(this.page.getByText('In App', { exact: false }).first());
    await this.assertVisible(this.page.getByText('Email', { exact: false }).first());
    await this.assertVisible(this.page.getByText('WhatsApp', { exact: false }).first());
  }
}

module.exports = { NotificationPage };
