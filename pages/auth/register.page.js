const { BasePage } = require('../base.page');
const { register } = require('../../locators/auth.locators');

class RegisterPage extends BasePage {
  async goto() {
    await super.goto('/sign-up');
  }

  async registerUser(user) {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ').replace(/[^a-zA-Z ]/g, ' ');
    await this.fill(this.page.locator(register.fullName).first(), fullName);
    await this.fill(this.page.locator(register.mobile).first(), user.mobile);
    await this.fill(this.page.locator(register.email).first(), user.email);

    if (/seller/i.test(user.role || '')) {
      await this.page.locator(register.sellerToggle).first().click().catch(() => {});
    }

    await this.click(this.page.locator(register.submit).first());
  }
}

module.exports = { RegisterPage };
