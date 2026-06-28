# Housing-Hunt Playwright Automation Framework

Scalable Playwright JavaScript framework for the Housing-Hunt real estate platform at `https://www.baserahub.com/`.

## Tech Stack

- Playwright Test
- JavaScript
- Page Object Model
- Data-driven test inputs
- Custom reporter
- Playwright HTML report
- Allure report
- JUnit report
- Screenshot, video, and trace artifacts
- Jenkins and GitHub Actions CI/CD

## Folder Structure

```text
.
|-- config/                 # Environment and runtime config
|-- data/                   # Test data and business enums
|-- docs/                   # Test strategy and framework notes
|-- fixtures/               # Base test with page object fixtures
|-- locators/               # Centralized locator contracts
|-- pages/                  # Page Object Model classes
|   |-- admin/
|   |-- agent/
|   |-- auth/
|   |-- leads/
|   |-- notifications/
|   |-- seller/
|   `-- user/
|-- reports/                # Generated reports and artifacts
|   |-- allure-report/
|   |-- allure-results/
|   |-- junit/
|   |-- playwright-report/
|   `-- test-results/
|-- tests/                  # Specs by module
|-- utils/                  # Helpers, assertions, builders, reporters
|-- Jenkinsfile
|-- playwright.config.js
|-- playwright.yaml
`-- package.json
```

## Setup

```bash
npm install
npx playwright install
cp .env.example .env
```

Update `.env` with real buyer, seller, agent, and admin credentials.

## Run Tests

```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:headed
npm run test:debug
```

## Reports

Playwright HTML report:

```bash
npm run report
```

Allure report:

```bash
npm run report:allure:generate
npm run report:allure:open
```

To generate and serve directly from raw Allure results:

```bash
npm run report:allure:serve
```

Report paths:

- Playwright HTML: `reports/playwright-report`
- Allure results: `reports/allure-results`
- Allure HTML report: `reports/allure-report`
- JUnit XML: `reports/junit/results.xml`
- Screenshots, videos, and traces: `reports/test-results`

## Implemented Coverage

- Login
- Registration
- Forgot Password
- OTP Verification page object
- Homepage browsing
- Property search
- Property filters
- Property details
- Intent form and lead capture
- Buyer dashboard
- Seller property listing workflow
- Seller dashboard
- Lead CRM
- Boost property analytics
- Notifications
- Agent dashboard
- Admin dashboard
- AI recommendation examples
- API health check

## Framework Conventions

- Tests import `test` and `expect` from `fixtures/base-test.js`.
- Page objects extend `pages/base.page.js`.
- Shared locators live in `locators/`.
- Dynamic test data comes from `utils/data-builder.js`.
- Secrets are never committed; use `.env` locally and CI secrets in pipelines.

## Example

```js
const { test } = require('../../fixtures/base-test');
const { loginAs } = require('../../utils/auth-helper');

test('seller dashboard shows property and lead actions', async ({ loginPage, sellerDashboardPage }) => {
  await loginAs(loginPage, 'seller');
  await sellerDashboardPage.goto();
  await sellerDashboardPage.assertSellerWidgets();
});
```

## CI/CD

### Jenkins

`Jenkinsfile` installs dependencies, installs Playwright browsers, runs smoke and regression suites, generates Allure, then publishes JUnit, Playwright HTML, Allure HTML, and artifact reports.

Jenkins should have these plugins available:

- NodeJS Plugin
- HTML Publisher Plugin
- JUnit Plugin

### GitHub Actions

`.github/workflows/playwright.yml` runs on pull requests, pushes, and manual dispatch. It generates Allure after test execution and uploads the full `reports/` folder as an artifact.

Store credentials in repository secrets.

## Scaling Guidance

- Add one page object per screen or cohesive component.
- Add shared flows to `utils/` only when used by multiple specs.
- Keep selectors stable by asking developers to add `data-testid` attributes for business-critical elements.
- Use tags like `@smoke`, `@regression`, `@admin`, and `@lead-crm` to control suite size in CI.
- Expand `tests/api/` once backend endpoint documentation is available.
