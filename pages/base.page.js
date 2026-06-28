const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path, {
      waitUntil: 'domcontentloaded'
    });

    await this.dismissTransientOverlays();
    await this.handleLocationPopup();
  }

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }

  byRole(role, options) {
    return this.page.getByRole(role, options);
  }

  async click(locator) {
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await locator.first().click({ force: true }).catch(async () => {
      await locator.first().scrollIntoViewIfNeeded().catch(() => {});
      await locator.first().click().catch(() => {});
    });
  }

  async fill(locator, value) {
    const target = locator.first();
    await target.scrollIntoViewIfNeeded().catch(() => {});
    await target.fill(String(value));
  }

  async select(locator, value) {
    await locator.selectOption(value);
  }

  async assertVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async assertUrlContains(fragment) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async safeClickByText(text) {
    await this.page.getByText(text, { exact: false }).first().click();
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await this.dismissTransientOverlays();
    await this.handleLocationPopup();
  }

  async dismissTransientOverlays() {
    const closeButtons = [
      '.ant-modal-wrap button:has(svg)',
      '.ant-modal-close',
      'button[aria-label="Close"]',
      'button:has-text("Not Now")',
      'button:has-text("Allow")',
      'button:has-text("OK")'
    ];

    for (const selector of closeButtons) {
      const button = this.page.locator(selector).first();

      if (await button.isVisible().catch(() => false)) {
        await button.click({ force: true }).catch(() => {});
      }
    }
  }

  async handleLocationPopup() {
    const modal = this.page.locator('.ant-modal-wrap').last();

    if (!(await modal.isVisible().catch(() => false))) {
      return;
    }

    const allowButton = modal.getByRole('button', { name: /allow/i }).first();

    if (await allowButton.isVisible().catch(() => false)) {
      await allowButton.click({ force: true }).catch(() => {});
    }

    await modal.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  }
}
module.exports = { BasePage };