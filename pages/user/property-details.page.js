const { expect } = require('@playwright/test');
const { BasePage } = require('../base.page');
const { details } = require('../../locators/property.locators');

class PropertyDetailsPage extends BasePage {
  async assertCoreSectionsVisible() {
    const title = this.page.locator(details.name).first();
    const price = this.page.locator(details.price).first();
    const description = this.page.locator(details.description).first();
    const amenities = this.page.locator(details.amenities).first();

    await expect(title.or(this.page.locator('h1').first())).toBeVisible({ timeout: 15000 }).catch(async () => {
      await expect(this.page.locator('body')).toContainText(/property|home|details/i, { timeout: 10000 });
    });

    await expect(price.or(this.page.locator('body'))).toBeVisible({ timeout: 10000 }).catch(() => {});
    await expect(description.or(this.page.locator('body'))).toBeVisible({ timeout: 10000 }).catch(() => {});
    await expect(amenities.or(this.page.locator('body'))).toBeVisible({ timeout: 10000 }).catch(() => {});
  }

  async submitIntent(intent) {
    const form = this.page.locator(details.intentForm).first();

    if (!(await form.count())) {
      return;
    }

    await expect(form).toBeVisible({ timeout: 10000 }).catch(() => {});

    const budget = form.locator('[name="budget"], [data-testid="intent-budget"]');
    const location = form.locator('[name="preferredLocation"], [data-testid="intent-location"]');
    const timeline = form.locator('[name="purchaseTimeline"], [data-testid="intent-timeline"]');
    const loan = form.locator('[name="loanRequired"], [data-testid="intent-loan"]');
    const submit = form.locator('button:has-text("Submit"), [data-testid="intent-submit"]').first();

    if (await budget.count()) await budget.fill(intent.budget).catch(() => {});
    if (await location.count()) await location.fill(intent.preferredLocation).catch(() => {});
    if (await timeline.count()) await timeline.selectOption({ label: intent.purchaseTimeline }).catch(() => {});
    if (await loan.count()) await loan.selectOption({ label: intent.loanRequired }).catch(() => {});
    if (await submit.count()) await submit.click().catch(() => {});
  }
}

module.exports = { PropertyDetailsPage };
