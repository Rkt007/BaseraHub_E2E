# Housing-Hunt Test Strategy

## Automation Layers

- UI smoke tests validate public availability and the most important journeys.
- UI regression tests validate role-specific workflows for buyer, seller, agent, and admin.
- API checks validate availability and can be expanded as backend endpoints become available.
- Data-driven tests keep search filters, lead statuses, and role credentials outside specs.

## Priorities

1. Authentication: login, registration, forgot password, OTP.
2. Buyer journeys: browse, search, filters, details, intent form, dashboard.
3. Seller journeys: listing creation, document/media workflow, status lifecycle, leads.
4. Business modules: lead CRM, notifications, boost analytics, AI recommendations.
5. Governance: agent verification and admin moderation/monitoring.

## Selector Strategy

Prefer selectors in this order:

1. `data-testid`
2. Accessible roles and labels
3. Stable form names
4. Text fallback
5. CSS fallback only when the UI has no better contract

## Data Strategy

- Static reusable examples live in `data/`.
- Unique test data is generated through `utils/data-builder.js`.
- Secrets and real role credentials belong in `.env` locally and CI secrets remotely.
- Test accounts should be seeded/reset by backend fixtures once APIs are available.

## Reporting

- HTML report: `reports/playwright-report`
- JUnit report: `reports/junit/results.xml`
- Allure results: `reports/allure-results`
- Allure report: `reports/allure-report`
- Traces, screenshots, and videos: `reports/test-results`
