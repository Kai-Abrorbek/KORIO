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

For a production build, mock **data** mode must be enabled explicitly. Authentication is never mocked in a production build: the Admin API login is required. Without this flag, Control Center and metric detail use `/admin/analytics/*`; users, subscriptions, and Content use read-only `/admin/*` endpoints, while operations and administrator management expose guarded actions. Pages without a corresponding API show an explicit unavailable state instead of demo records. `ADMIN_STATIC_EXPORT=true` produces the static export used by the Docker image. The Admin Dockerfile builds in API mode.

To test the current live-data path locally, run the API with its database and admin auth configuration, then start the admin app with `$env:NEXT_PUBLIC_ADMIN_DATA_MODE="api"`. The account needs an admin role plus `analytics:read`, `users:read`, `subscription:read`, `content:read`, or `audit:read` for the corresponding pages. No admin credentials are bundled with the frontend.

In API mode, visible live-data pages refresh automatically: most queries every 30 seconds, subscription summaries every minute, costly historical/content aggregates every 2–5 minutes, and Google Play report views every 5 minutes. Hidden tabs pause polling and refresh when brought back after their interval; changing filters or the date range fetches immediately. Preset date ranges advance after local midnight while an open tab remains active. These are near-real-time reads, not push updates. Mock and unavailable pages have no live source to refresh, and Google Play financial figures change only when new source reports are available.

DAU/WAU/MAU count distinct users with a positive study record, not app opens or study sessions. The API groups `UserStats.date` into each learner's local calendar date (using their current saved time zone, or the app default). An account already counted on that date does not add another user when it studies again. A changed time-zone setting can affect the displayed date of older records because the original time zone was not stored on each stats row.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Control Center, dated metric cards, breakdown, alerts |
| `/metrics` | Metric drill down and date table |
| `/users` | Searchable users and detail drawer |
| `/content` | Read-only learning path, questions, quality, Grammar/Expressions/Hangul library, and translation diagnostics in API mode; connection guidance in mock mode |
| `/analytics` | Section/unit/lesson metrics, lesson funnel, question analytics, retention |
| `/subscriptions` | Subscription state, trends, customer management |
| `/revenue` | Google Play estimated sales and earnings reports in API mode; gross revenue, expenses, profit and settlements in mock mode only |
| `/gamification` | Live XP, streak, league and monthly quest analytics; read-only server rules |
| `/operations` | Live release status and announcement push; unavailable controls are labelled |
| `/admin` | Live audit log, administrator accounts and role management |

Query parameters select tabs, so links can drill down between pages (for example `/analytics?tab=funnel`).

## Connecting the backend

The API has `/admin/auth/*`, `/admin/analytics/*`, `/admin/gamification/*`, paginated read-only `/admin/users`, `/admin/subscriptions`, `/admin/content/path`, `/admin/content/path/units`, `/admin/content/questions`, `/admin/content/library`, `/admin/content/localization`, and `/admin/audit` endpoints, plus guarded `/admin/operations/*` and `/admin/administrators/*` routes and Google Play report-backed `/admin/revenue/summary` and `/admin/revenue/transactions` endpoints. Control Center and metric detail consume analytics in API mode, including prior-period comparison. User, subscription, audit, revenue and gamification pages consume their corresponding live endpoints. In API mode, Content's Learning Path tab browses Section → Unit → Node → Lesson and surfaces inconsistent links; Questions and Quality show individual questions and 30-day response signals; Library reads Grammar and Expression documents plus the server's fixed Hangul character IDs; Translation Status finds missing learner-language values in major top-level fields. Nested example, dialogue, quiz and question-option translations are not audited yet. All Content tabs are read-only. The existing `src/shared/api/client.ts` supplies the admin token and handles 401 responses.

Legacy content mock data follows the existing `LessonNode → Lesson → Question` hierarchy and the separate Grammar, Expression and Hangul sources, but the mock editor is no longer exposed at `/content`: showing editable demo questions would be misleading for read-only diagnostics. This does not imply a database schema change. In API mode, `/gamification` reads `/admin/gamification/overview` and `/admin/gamification/settings`. Period XP uses each learner's local date in `UserStats`, while lifetime XP, streak and league tier distributions are current user snapshots. Monthly quest counters reflect only the currently stored month. Challenge claim arrays do not retain a complete history, so the panel explicitly does not calculate a historical participation rate. Settings values come from the server constants and cannot be edited in the panel. In mock mode, `/revenue` uses a separate typed `RevenueSource` with clearly labelled KRW demo figures. These must not be used for financial reporting. In API mode, `/revenue` reads Google Play financial reports through the backend: estimated sales are buyer-currency, provisional figures; earnings are merchant-currency, monthly report figures. The UI keeps them separate, never converts currencies implicitly, and does not claim profit or payout from incomplete data. If the Play bucket is not configured or reports have not been generated, it shows an explicit no-data state rather than revenue of zero. The real subscription records still do not contain reliable charged prices; they are not used as a revenue ledger.

Hangul display text (characters, names, examples) remains in the mobile app's static `constants/hangul.ts`. The server only owns the 40 progress IDs, so the Admin Library labels Hangul as a static-ID source and does not claim to show or validate its mobile translations.

To connect Play reports, set `GOOGLE_PLAY_REPORT_BUCKET=gs://pubsite_prod_rev_...` on the API server and grant its Google service account access to the Play financial reports. The server also needs the existing `GOOGLE_PLAY_PACKAGE_NAME`. The API checks for new monthly report snapshots daily; a super admin can request a check with `POST /admin/revenue/sync`. Viewing reports requires `subscription:read`. No report bucket or credentials are shipped in the admin frontend. Live imports and reconciliation against Play Console must be verified when the first real report becomes available.

Mutating actions in mock mode are local demonstrations. Operations and mock audit records use browser storage; other feature mocks reset on full reload. In API mode, `/admin/operations/status` reads the effective app release policy and push-token audience; four-language announcement push uses `/admin/operations/announcements/send` with super-admin permission, a confirmation step, a reason and an audit record. Maintenance mode, feature flags and campaigns are explicitly unavailable until the mobile/API runtime contract exists. `/admin/administrators` reads the live permission matrix and existing admin accounts. A super admin can change or revoke a non-super-admin role after re-entering their admin password and a reason; the change increments `tokenVersion`, invalidating that account's existing app and admin sessions. Granting a new admin or changing a super admin remains a server-script operation.
