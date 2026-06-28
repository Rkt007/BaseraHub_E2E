const { BasePage } = require('./base.page');
const { expect } = require('@playwright/test');


class HomePage extends BasePage {
  async goto() {
    await super.goto('/');
  }

  async search(city) {
    await this.dismissTransientOverlays();
    await this.handleLocationPopup();

    try {
      const searchInput = this.page.locator('input[type="search"]').first();
      await searchInput.click();
      await searchInput.fill(city);

      const option = this.page
        .locator('.ant-select-item-option')
        .filter({ hasText: city })
        .first();

      await option.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      if (await option.isVisible().catch(() => false)) {
        await option.click();
      }

      const searchButton = this.page.getByRole('button', { name: /search/i }).last();
      await expect(searchButton).toBeEnabled();
      await searchButton.click({ force: true }).catch(async () => {
        await searchButton.scrollIntoViewIfNeeded();
        await searchButton.click();
      });
    } catch (error) {
      await this.page.goto(`/for-sale/property/${encodeURIComponent(city)}?propertyCategory=residential`, {
        waitUntil: 'domcontentloaded'
      });
      await this.waitForPageReady();
    }
  }
 

async assertLoaded() {

  await expect(
    this.page.getByRole('heading', {
      name: /Discover Your Dream Property/i
    })
  ).toBeVisible();

  console.log(
    'Modal count:',
    await this.page.locator('.ant-modal-wrap').count()
  );

  console.log(
    'Allow visible:',
    await this.page
      .getByRole('button', { name: 'Allow' })
      .isVisible()
      .catch(() => false)


  );
}
}
module.exports = { HomePage };
