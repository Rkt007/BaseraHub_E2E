const { BasePage } = require('../base.page');

class LeadCrmPage extends BasePage {
  async goto() {
    await super.goto('/seller/leads');
  }

  async openLeadInbox() {
    await this.click(this.page.locator('[data-testid="lead-inbox"], text=Lead Inbox').first());
  }

  async updateLeadStatus(leadName, status) {
    const row = this.page.getByRole('row').filter({ hasText: leadName }).first();
    await row.locator('[data-testid="lead-status"], select[name="status"]').selectOption({ label: status });
  }

  async addFollowUp(leadName, note) {
    const row = this.page.getByRole('row').filter({ hasText: leadName }).first();
    await row.locator('[data-testid="add-follow-up"], button:has-text("Follow")').click();
    await this.page.locator('[name="note"], [data-testid="follow-up-note"]').fill(note);
    await this.page.locator('[data-testid="save-follow-up"], button:has-text("Save")').click();
  }
}

module.exports = { LeadCrmPage };
