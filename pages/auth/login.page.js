const { BasePage } = require('../base.page');
const { login } = require('../../locators/auth.locators');

class LoginPage extends BasePage {
  get identifierInput() {
    return this.page.locator(login.identifier).first();
  }

  get submitButton() {
    return this.page.locator(login.submit).first();
  }

  async goto() {
    await super.goto('/login');
  }

  async login(email, password) {
    await this.requestOtp(email);

    if (password && process.env.OTP_CODE) {
      await this.fill(this.page.locator(login.otp).first(), process.env.OTP_CODE);
      await this.click(this.submitButton);
    }

    await this.waitForPageReady();
  }

  async requestOtp(identifier) {
    await this.fill(this.identifierInput, identifier);
    await this.click(this.submitButton);
  }
}

module.exports = { LoginPage };
