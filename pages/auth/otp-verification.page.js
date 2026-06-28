const { BasePage } = require('../base.page');
const { otp } = require('../../locators/auth.locators');

class OtpVerificationPage extends BasePage {
  async goto() {
    await super.goto('/otp-verification');
  }

  async verifyOtp(code) {
    await this.fill(this.page.locator(otp.input).first(), code);
    await this.click(this.page.locator(otp.verify).first());
  }

  async resendOtp() {
    await this.click(this.page.locator(otp.resend).first());
  }
}

module.exports = { OtpVerificationPage };
