const { BasePage } = require('../base.page');

class ForgotPasswordPage extends BasePage {
  async goto() {
    await super.goto('/login');
  }

  async requestReset(email) {
    await this.fill(this.page.locator('input[placeholder*="mobile"], input[placeholder*="email"], input[type="text"]').first(), email);
    await this.click(this.page.locator('button:has-text("Send OTP")').first());
  }
}

module.exports = { ForgotPasswordPage };
