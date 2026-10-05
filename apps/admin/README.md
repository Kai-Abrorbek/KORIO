# KORIO Admin

`apps/admin` is the KORIO operations console. The navigation and pages are built to work with typed mock data while the remaining NestJS admin endpoints are developed.

## Run

```bash
pnpm --filter admin dev
```

Development defaults to mock mode. The top bar shows `MOCK DATA`, and a local-only demo administrator has all UI permissions. No action changes production data.

```bash
$env:NEXT_PUBLIC_ADMIN_DATA_MODE="mock"
pnpm --filter admin build
```

For a production build, mock **data** mode must be enabled explicitly. Authentication is never mocked in a production build: the existing Admin API login is required. Without this flag, the existing live dashboard API is used. `ADMIN_STATIC_EXPORT=true` produces the static export used by the Docker image. The Admin Dockerfile currently enables mock data mode while the new endpoints are unfinished.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Control Center, dated metric cards, breakdown, alerts |
| `/metrics` | Metric drill down and date table |
| `/users` | Searchable users and detail drawer |
| `/content` | Hierarchy, questions, quality, localized content |
| `/analytics` | Section/unit/lesson metrics, lesson funnel, question analytics, retention |
| `/subscriptions` | Subscription state, trends, customer management |
| `/revenue` | Gross revenue, expenses, profit, settlement and mock transaction ledger |
| `/gamification` | XP/streak/league/challenge and server constants |
| `/operations` | Mock service controls, announcements and campaigns |
| `/admin` | Audit log and role matrix |

Query parameters select tabs, so links can drill down between pages (for example `/analytics?tab=funnel`).

## Connecting the backend

The current API has `/admin/auth/*` and five `/admin/analytics/*` read endpoints. It does not yet have admin list or mutation endpoints for users, content, subscriptions, operations or audit. Frontend feature modules therefore define typed sources/repositories beside each page (`src/features/*/mock-source.ts` or `repository.ts`). Implement API-backed versions of those contracts and swap the imports when endpoints exist. The existing `src/shared/api/client.ts` supplies the admin token and handles 401 responses.

Content mocks follow the existing `LessonNode → Lesson → Question` hierarchy and the separate Grammar, Expression and Hangul sources. They do not imply a database schema change. The `/revenue` screen uses a separate typed `RevenueSource` with clearly labelled KRW mock figures: daily/weekly/monthly/yearly gross sales, refunds, fees, operating expenses, profit, settlements, channel mix and transaction exports. The real subscription records still do not contain reliable price/currency data, so these figures must not be used for financial reporting. Real revenue/MRR requires an API-backed payment, refund, exchange-rate and expense ledger.

Mutating actions in mock mode are local demonstrations. Operations and mock audit records use browser storage; other feature mocks reset on full reload. The NestJS backend must enforce role permissions, confirmation reason requirements and audit logging when the real endpoints are added.
