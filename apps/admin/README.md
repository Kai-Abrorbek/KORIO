# KORIO Admin

`apps/admin` is the KORIO operations console. Local development uses typed mock data by default; production uses the NestJS Admin API for connected pages.

## Run

```bash
pnpm --filter admin dev
```

Development defaults to mock mode. The top bar shows `MOCK DATA`, and a local-only demo administrator has all UI permissions. No action changes production data.

```bash
$env:NEXT_PUBLIC_ADMIN_DATA_MODE="mock"
pnpm --filter admin build
```

For a production build, mock **data** mode must be enabled explicitly. Authentication is never mocked in a production build: the Admin API login is required. Without this flag, Control Center and metric detail use `/admin/analytics/*`; users, subscriptions, content questions and quality, and audit use their read-only `/admin/*` endpoints. Pages without a corresponding API show an explicit unavailable state instead of demo records. `ADMIN_STATIC_EXPORT=true` produces the static export used by the Docker image. The Admin Dockerfile builds in API mode.

To test the current live-data path locally, run the API with its database and admin auth configuration, then start the admin app with `$env:NEXT_PUBLIC_ADMIN_DATA_MODE="api"`. The account needs an admin role plus `analytics:read`, `users:read`, `subscription:read`, `content:read`, or `audit:read` for the corresponding pages. No admin credentials are bundled with the frontend.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Control Center, dated metric cards, breakdown, alerts |
| `/metrics` | Metric drill down and date table |
| `/users` | Searchable users and detail drawer |
| `/content` | Read-only question locations and quality diagnostics in API mode; connection guidance in mock mode |
| `/analytics` | Section/unit/lesson metrics, lesson funnel, question analytics, retention |
| `/subscriptions` | Subscription state, trends, customer management |
| `/revenue` | Google Play estimated sales and earnings reports in API mode; gross revenue, expenses, profit and settlements in mock mode only |
| `/gamification` | XP/streak/league/challenge and server constants |
| `/operations` | Mock service controls, announcements and campaigns |
| `/admin` | Audit log and role matrix |

Query parameters select tabs, so links can drill down between pages (for example `/analytics?tab=funnel`).

## Connecting the backend

The API has `/admin/auth/*`, five `/admin/analytics/*` read endpoints, paginated read-only `/admin/users`, `/admin/subscriptions`, `/admin/content/questions`, and `/admin/audit` endpoints, and Google Play report-backed `/admin/revenue/summary` and `/admin/revenue/transactions` endpoints. Control Center and metric detail consume analytics in API mode, including prior-period comparison. User, subscription, audit, and revenue pages consume the corresponding live endpoints. In API mode, Content's Questions and Quality tabs find questions, show every Section → Unit → Node → Lesson location, and surface structural issues and 30-day response signals without editing data. Other Content tabs, gamification, and operations still lack live admin endpoints and display an unavailable state. Frontend feature modules retain typed mock sources for local UI work. The existing `src/shared/api/client.ts` supplies the admin token and handles 401 responses.

Legacy content mock data follows the existing `LessonNode → Lesson → Question` hierarchy and the separate Grammar, Expression and Hangul sources, but the mock editor is no longer exposed at `/content`: showing editable demo questions would be misleading for read-only diagnostics. This does not imply a database schema change. In mock mode, `/revenue` uses a separate typed `RevenueSource` with clearly labelled KRW demo figures. These must not be used for financial reporting. In API mode, `/revenue` reads Google Play financial reports through the backend: estimated sales are buyer-currency, provisional figures; earnings are merchant-currency, monthly report figures. The UI keeps them separate, never converts currencies implicitly, and does not claim profit or payout from incomplete data. If the Play bucket is not configured or reports have not been generated, it shows an explicit no-data state rather than revenue of zero. The real subscription records still do not contain reliable charged prices; they are not used as a revenue ledger.

To connect Play reports, set `GOOGLE_PLAY_REPORT_BUCKET=gs://pubsite_prod_rev_...` on the API server and grant its Google service account access to the Play financial reports. The server also needs the existing `GOOGLE_PLAY_PACKAGE_NAME`. The API checks for new monthly report snapshots daily; a super admin can request a check with `POST /admin/revenue/sync`. Viewing reports requires `subscription:read`. No report bucket or credentials are shipped in the admin frontend. Live imports and reconciliation against Play Console must be verified when the first real report becomes available.

Mutating actions in mock mode are local demonstrations. Operations and mock audit records use browser storage; other feature mocks reset on full reload. The NestJS backend must enforce role permissions, confirmation reason requirements and audit logging when the real endpoints are added.
