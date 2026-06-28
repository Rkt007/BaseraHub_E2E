const { expect } = require('@playwright/test');
const { BasePage } = require('../base.page');
const { search } = require('../../locators/property.locators');

class SearchPage extends BasePage {

  async goto() {
    await super.goto('/');
    await this.handleLocationPopup();
  }

  async searchByCity(city) {
    await this.page.goto(
      `/for-sale/property/${encodeURIComponent(city)}?propertyCategory=residential`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await this.waitForPageReady();
  }

  async handleLocationPopup() {
    const modal = this.page.locator('.ant-modal-wrap');

    if (!(await modal.isVisible().catch(() => false))) {
      return;
    }

    const allowBtn = modal.getByRole('button', { name: 'Allow' });

    await expect(allowBtn).toBeVisible({ timeout: 10000 });

    await allowBtn.click({ force: true });

    await expect(modal).toBeHidden({ timeout: 10000 });
  }

  async applyFilters(filters) {
    await this.clickFilterIfPresent(filters.propertyType);
    await this.clickFilterIfPresent(`${filters.bedrooms}-BHK`);
    await this.clickFilterIfPresent(filters.furnishing);

    if (filters.amenities) {
      for (const amenity of filters.amenities) {
        await this.clickFilterIfPresent(amenity);
      }
    }
  }

  async openFirstProperty() {
    const firstProperty = this.page.locator(search.resultCard).first();

    await expect(firstProperty).toBeVisible();
    await firstProperty.click();

    await this.waitForPageReady();
  }

  async selectIfPresent(selector, value) {
    if (!value) return;

    const field = this.page.locator(selector).first();

    if (await field.count()) {
      await field.selectOption({ label: value }).catch(async () => {
        await field.fill(value);
      });
    }
  }

  async clickFilterIfPresent(label) {
    if (!label) return;

    const option = this.page.getByText(label, { exact: false }).first();

    if (await option.isVisible().catch(() => false)) {
      await option.click();
    }
  }
}

module.exports = { SearchPage };