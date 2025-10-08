# Clean Report - 2025-10-08

## Files moved to cleanup
- `cleanup/duplicates/admin/postcss.config.js` (duplicate of `frontend/postcss.config.js`)
- `cleanup/duplicates/admin/tailwind.config.js` (duplicate of `frontend/tailwind.config.js`)
- `cleanup/removed/ci/lint-output-initial.log`
- `cleanup/removed/ci/lint-output-final.log`
- `cleanup/removed/ci/test-output-initial.log`
- `cleanup/removed/ci/test-output-final.log`
- Contents of `cleanup/removed/frontend/dist/` (built assets previously committed)

## Duplicate files identified
- `frontend/tailwind.config.js` ↔ `admin/tailwind.config.js` (frontend copy kept, admin copy quarantined)
- `frontend/postcss.config.js` ↔ `admin/postcss.config.js` (frontend copy kept, admin copy quarantined)

## Dependency check (manual)
- Automated `npx depcheck --json` failed offline (`ci/logs/depcheck.json`).
- Manual review flagged:
  - Backend `helmet` is listed but unused in source — propose uninstall after confirming no planned use.
  - Backend devDependency `supertest` unused in tests — propose uninstall if no integration tests planned.
  - Frontend `react-hook-form` unused — propose uninstall or implement forms with it.
- All other listed dependencies have references in code or configs.

## Lint & formatting
- `npx eslint . --ext .js,.jsx,.ts,.tsx --fix` blocked by offline registry access (`ci/logs/eslint-fix.log`). No lint changes applied.

## Tests & builds
- `backend`: `npm ci` and `npm test` succeeded (logs: `ci/logs/backend-npm-ci.log`, `ci/logs/backend-npm-test.log`, `ci/logs/backend-npm-test-post.log`).
- `frontend`: `npm ci` failed (Node 18 < required Node 20 for react-router 7 + esbuild EPERM) — see `ci/logs/frontend-npm-ci.log`.
- `frontend`: `npm run build` failed because local Vite binary not executable under current install (`ci/logs/frontend-npm-build.log`).
- No additional tests available; documented failures to avoid destructive changes.

## Additional notes
- Added `frontend/.env.example` with `VITE_API_BASE_URL` placeholder.
- Updated `.gitignore` to standardize ignores while allowing tracked quarantine folders.
