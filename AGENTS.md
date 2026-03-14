# AGENTS.md

TypeScript monorepo — React SPA (`client/`) served by an Express API (`server/`). Both compile into `server/dist/` where a single Node process handles API routes and static SPA files.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · TanStack Query · React Hook Form + Yup · React Router v6 · Express · MongoDB (Mongoose) · JWT · Google Sheets API · Yarn workspaces · PM2

---

## Structure

```text
client/src/
  api/         # Axios instance + per-resource request functions
  components/  # Reusable UI
  context/     # React Context — Auth, Payments, Homeworks, Modal
  pages/       # Route-level components
  routes/      # Router setup + ProtectedRoute
  utils/       # formBuilder, helpers
  types/

server/src/
  controllers/ # Request handlers (business logic lives here)
  model/       # Mongoose schemas — one file per collection
  routes/      # Express routes — wire paths to controllers + middleware only
  utils/       # JWT helpers, auth middleware, pagination
  types/
```

---

## Commands

```bash
yarn install          # install all workspace deps
yarn dev:server       # Express + nodemon (hot reload)
yarn dev:client       # Vite dev server — proxies /api → localhost:8004
yarn build            # full prod build: client → server → copy SPA into server/dist/public
yarn prettify         # format all source files
```

`yarn build` runs three steps: `build:client` → `build:server` → `build:cts` (copies client dist into server). Always run the full build to verify changes.

---

## Environment

Create `server/.env` (gitignored — never commit):

```bash
SERVER_PORT=8004
SECRET_KEY=your_jwt_secret
TOKEN_EXPIRES_IN=7d
DB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/buoy
GOOGLE_PROJECT_ID=
GOOGLE_PRIVATE_KEY_ID=
GOOGLE_PRIVATE_KEY=
GOOGLE_CLIENT_EMAIL=
GOOGLE_CLIENT_ID=
GOOGLE_AUTH_URI=
GOOGLE_TOKEN_URI=
GOOGLE_AUTH_PROVIDER_CERT_URL=
GOOGLE_CLIENT_CERT_URL=
```

Google fields are only needed for payments sync. Leave blank when working on unrelated features.

---

## Before Marking a Task Complete

1. `yarn build` passes with no TypeScript errors
2. `yarn prettify` — commit any formatting changes
3. Affected feature works end-to-end in the browser

There is no automated test suite. Do not add one unless explicitly asked.

---

## Code Rules

- TypeScript `strict` is on everywhere. Fix all type errors; no `@ts-ignore` without explanation.
- Use `@/*` path alias (maps to `src/*`) — never deep relative imports.
- Functional components and hooks only. `async/await` over Promise chains.
- No `any` without a comment explaining why.
- No inline styles — use Tailwind utilities.
- No cross-boundary imports (`client/` ↔ `server/`).

**Prettier config:** tabs · width 2 · print width 100 · single quotes · no semicolons · trailing commas.

---

## Architecture Rules

**Frontend**

- All HTTP calls go through `client/src/api/`. Never use `fetch` or a new Axios instance in components.
- Server state → TanStack Query only. Do not put API data into React state or context.
- App state (auth, modal) → existing React Contexts in `client/src/context/`. No new state library.
- Forms → React Hook Form + Yup. Use `formBuilder` utility for field configs.
- New routes → wrap with `<ProtectedRoute>` and assign correct role access.
- Modals → trigger via `ModalContext`. Do not mount independent modals inside page components.

**Backend**

- Business logic belongs in controllers, not route files.
- Apply auth middleware to every protected endpoint.

---

## Roles

| Role        | Access                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------- |
| **Student** | Meetings (view), Homeworks (submit), Feedback (fill form), Payments (view)                          |
| **Mentor**  | Meeting reports (create), Feedbacks (view/manage), Homeworks (view), Reporting (ACTIVE status only) |
| **Admin**   | Unpaid payments management                                                                          |

Enforce role restrictions at both the Express middleware level and the `<ProtectedRoute>` / conditional render level. Do not change role definitions or `ACTIVE`/`INACTIVE` status values without explicit instruction.

---

## Security

- Never hard-code secrets. All credentials go in `server/.env`.
- Never log JWT tokens, passwords, or Google credentials.
- Never expose raw server errors to the client — use generic error messages in API responses.
- Google Sheets spreadsheet ID and service account keys must never appear in client-side code or comments.

---

## Git

- Branches: `feature/<kebab-name>` or `fix/<kebab-name>`
- Commits: imperative mood — `feat: add homework endpoint`, `fix: handle null payment status`
- No force-push to `master`

Deployment is automatic: any push to `master` triggers GitHub Actions → SCP bundle to DigitalOcean → PM2 reload.

---

## Do Not Touch

- `.github/workflows/deploy.yml` and `ecosystem.config.js` — production CI/CD
- `server/src/controllers/payments*` — Google Sheets integration, no tests, sensitive
- No new npm dependencies without approval
- No new state management or CSS/component libraries
