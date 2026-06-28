const { test: base, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/auth/login.page');
const { RegisterPage } = require('../pages/auth/register.page');
const { ForgotPasswordPage } = require('../pages/auth/forgot-password.page');
const { OtpVerificationPage } = require('../pages/auth/otp-verification.page');
const { HomePage } = require('../pages/home.page');
const { SearchPage } = require('../pages/user/search.page');
const { PropertyDetailsPage } = require('../pages/user/property-details.page');
const { UserDashboardPage } = require('../pages/user/user-dashboard.page');
const { SellerDashboardPage } = require('../pages/seller/seller-dashboard.page');
const { PropertyListingPage } = require('../pages/seller/property-listing.page');
const { LeadCrmPage } = require('../pages/leads/lead-crm.page');
const { BoostPropertyPage } = require('../pages/seller/boost-property.page');
const { NotificationPage } = require('../pages/notifications/notification.page');
const { AgentDashboardPage } = require('../pages/agent/agent-dashboard.page');
const { AdminDashboardPage } = require('../pages/admin/admin-dashboard.page');

const test = base.extend({

  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  forgotPasswordPage: async ({ page }, use) => use(new ForgotPasswordPage(page)),
  otpVerificationPage: async ({ page }, use) => use(new OtpVerificationPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  searchPage: async ({ page }, use) => use(new SearchPage(page)),
  propertyDetailsPage: async ({ page }, use) => use(new PropertyDetailsPage(page)),
  userDashboardPage: async ({ page }, use) => use(new UserDashboardPage(page)),
  sellerDashboardPage: async ({ page }, use) => use(new SellerDashboardPage(page)),
  propertyListingPage: async ({ page }, use) => use(new PropertyListingPage(page)),
  leadCrmPage: async ({ page }, use) => use(new LeadCrmPage(page)),
  boostPropertyPage: async ({ page }, use) => use(new BoostPropertyPage(page)),
  notificationPage: async ({ page }, use) => use(new NotificationPage(page)),
  agentDashboardPage: async ({ page }, use) => use(new AgentDashboardPage(page)),
  adminDashboardPage: async ({ page }, use) => use(new AdminDashboardPage(page)),

});

module.exports = { test, expect };