const { BasePage } = require('../base.page');

class PropertyListingPage extends BasePage {
  async goto() {
    await super.goto('/seller/properties/new');
  }

  async createDraft(property) {
    await this.fillByName('title', property.title);
    await this.fillByName('price', property.price);
    await this.fillByName('description', property.description);
    await this.fillByName('address', property.address);
    await this.fillByName('city', property.city);
    await this.fillByName('state', property.state);
    await this.fillByName('landmark', property.landmark);
    await this.fillByName('street', property.street);
    await this.selectOrFill('listingType', property.listingType);
    await this.fillByName('size', property.size);
    await this.selectOrFill('bedrooms', property.bedrooms);
    await this.selectOrFill('bathrooms', property.bathrooms);
    await this.selectOrFill('furnishing', property.furnishing);
    await this.selectOrFill('parking', property.parking);
    await this.selectOrFill('ownership', property.ownership);
    await this.fillByName('builderName', property.builderName);
    await this.fillByName('yearCompleted', property.yearCompleted);
    await this.fillByName('totalFloors', property.totalFloors);
    await this.page.locator('[data-testid="save-draft"], button:has-text("Save Draft")').click();
  }

  async submitForReview() {
    await this.page.locator('[data-testid="submit-property"], button:has-text("Submit")').click();
  }

  async fillByName(name, value) {
    await this.page.locator(`[name="${name}"], [data-testid="${name}"]`).first().fill(String(value));
  }

  async selectOrFill(name, value) {
    const field = this.page.locator(`[name="${name}"], [data-testid="${name}"]`).first();
    await field.selectOption({ label: String(value) }).catch(async () => field.fill(String(value)));
  }
}

module.exports = { PropertyListingPage };
