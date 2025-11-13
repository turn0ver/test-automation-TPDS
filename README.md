# 🧪 Playwright Test Automation Project
> Automated UI, API, E2E and performance tests for a full-stack e-commerce application using:

Next.js — frontend https://github.com/jungrama/strapi-ecommerce-nextjs

Strapi CMS — backend & API https://github.com/jungrama/strapi-ecommerce-cms

SQLite — local development database

Playwright — testing framework

This project also documents architectural findings, risks, and improvements for maintainability and testability.

## 📁 Project Structure

```text
.
├── .github/                        # GitHub workflows (CI/CD)
├── node_modules/                   # Project dependencies
│
├── playwright-report/              # Auto-generated HTML reports
├── postman_collection/             # Postman API collections
│
├── src/
│   ├── flows/                      # Business flows (multi-page actions)
│   │   └── auth.flows.ts           # Login, register, recovery, sessions
│   │
│   ├── pages/                      # Page Object Models (POM)
│   │   ├── base.page.ts            # Base page (common helpers)
│   │   ├── login.page.ts           # Login page selectors & methods
│   │   └── register.page.ts        # Register page selectors & methods
│   │
│   └── utils/
│       └── test-user.factory.ts    # User factory for test data generation
│
├── test-results/                   # Playwright traces, screenshots, logs
│
├── tests/
│   ├── e2e/                        # Full end-to-end journeys
│   │   ├── auth.e2e.spec.ts
│   │   └── register.e2e.spec.ts
│   │
│   ├── stress/                     # Load & concurrency scenarios
│   │   └── login.stress.spec.ts
│   │
│   └── ui/                         # Component/UI validation tests
│       └── login.ui.spec.ts
│
├── .env                            # Environment variables (local setup)
├── .gitignore
├── fixtures.ts                     # Global test fixtures (browser, context)
│
├── package.json                    # Scripts + dependencies
├── package-lock.json               # Dependency lock
├── playwright.config.ts            # Test runner config & browser settings
├── README.md                       # Documentation
└── tsconfig.json                   # TypeScript compiler config


## 📦 Getting Started

1. Install dependencies

```sh
npm install
```

2. Install Playwright browsers

```sh
npm playwright install
```

3. Configure environment variables (Local Running)

```sh
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:1337/api
```

4. Running the tests

```sh
npm test
```

5. Run a type of test

```sh
npm test:ui
```

Open the HTML report

```sh
npx playwright show-report
```

## 🔍 Issues Identified

🟥 Backend / Strapi

Admin UI sometimes shows a blank page due to corrupted internal CMS settings.

Seeds created inconsistent relationships leading to DB schema conflicts.

JWT authentication sometimes fails because of inconsistent permission settings.

No standard API error format.

No concurrency protection for order operations.

🟥 Remote Admin URL / External Demo Link — Incorrect Configuration

The project contains a broken remote admin link pointing to:

```sh
https://sneakpeaks.jungrama.com/admin/
Email: storeadmin@example.com
Password: Password123
```

⚠️ This URL is not related to the local Strapi application.
It appears to be a leftover reference from a totally different public demo, and attempting to access or configure it provides no functional value for this project.

Because of this:

The reference to the external admin URL is misleading.

Users might assume the project supports remote Strapi admin access when it doesn't.

The link is not synchronized with the local environment.

It can cause confusion when debugging or setting up tests.

📌 Recommendation:
Remove the link from documentation and UI. Ensure all environment references point to the local admin URL only

🟧 Frontend

Missing stable selectors (data-testid) for elements.

Dynamic components and conditional rendering cause flaky UI tests.

Checkout relies heavily on client-side state that is not validated on the backend.

🟨 Dependencies

Several vulnerabilities detected during installation.



## 🧪 Testability Recommendations

✅ Frontend Improvements

Add data-testid to important buttons, inputs, and action elements.

Extract reusable components (e.g., ProductCard, CartItem).

Normalize UI loading and error states for deterministic automation.

Replace fragile selectors like text-based locators.

✅ Backend Improvements

Avoid modifying admin configuration via seed scripts.

Introduce a minimal test seed:

1 brand

1 product

1 category

1 collection

1 banner

Improve backend validation, especially around carts and orders.

Standardize error messages into a predictable JSON format.

