# Meiyu Minapp Collaboration Guide

## Project Snapshot
- This is a `uni-app` + `Vue 3` + `TypeScript` WeChat Mini Program project.
- Package manager is `pnpm`.
- Recommended Node version is `20.18.1` (declared in `package.json` via `volta`).
- Main commands:
  - `pnpm dev`
  - `pnpm dev-tools`
  - `pnpm build`
  - `pnpm type-check`
  - `pnpm lint`

## Source Of Truth
- Route config is maintained in [pages.config.ts](/d:/code/meiyu/meiyu-minapp/pages.config.ts).
- Manifest config is maintained in [manifest.config.ts](/d:/code/meiyu/meiyu-minapp/manifest.config.ts).
- Generated files [src/pages.json](/d:/code/meiyu/meiyu-minapp/src/pages.json) and [src/manifest.json](/d:/code/meiyu/meiyu-minapp/src/manifest.json) should normally not be edited by hand.

## App Structure
- [src/pages/index.vue](/d:/code/meiyu/meiyu-minapp/src/pages/index.vue) is only a lightweight entry page. It redirects to login or the business dashboard.
- `pagesA` is the main business-side subpackage and contains most merchant features.
- `pagesB` is the customer-side subpackage and is currently much smaller.
- Main package should stay small. New business pages should prefer subpackages instead of the root `pages`.

## State And Shared Context
- Pinia is initialized in [src/stores/index.ts](/d:/code/meiyu/meiyu-minapp/src/stores/index.ts) with persisted storage.
- User state lives in [src/stores/modules/user.ts](/d:/code/meiyu/meiyu-minapp/src/stores/modules/user.ts).
- Merchant state lives in [src/stores/modules/business.ts](/d:/code/meiyu/meiyu-minapp/src/stores/modules/business.ts).
- Cross-page temporary business context lives in [src/stores/common.ts](/d:/code/meiyu/meiyu-minapp/src/stores/common.ts).
- `storeId` is derived globally from the current user store and is injected into many requests.

## Request Layer
- API calls should go through [src/utils/request.ts](/d:/code/meiyu/meiyu-minapp/src/utils/request.ts) and [src/utils/http.ts](/d:/code/meiyu/meiyu-minapp/src/utils/http.ts).
- `http.ts` prepends `VITE_BASE_URL` for normal API calls.
- `Authorization`, `envVersion`, and `B-Store-Id` headers are injected centrally.
- Backend success contract is effectively:
  - `code === 200`: success
  - `code === 20001`: token expired, clear user info and redirect to `/pagesA/login/index`
  - other codes: show toast and reject
- When adding new APIs, keep response handling consistent with this contract.

## UI And Styling
- UNO CSS is enabled globally.
- Auto-import and auto-components are configured in [vite.config.ts](/d:/code/meiyu/meiyu-minapp/vite.config.ts).
- Shared components live in [src/components](/d:/code/meiyu/meiyu-minapp/src/components).
- Layout wrappers live in [src/layouts/default.vue](/d:/code/meiyu/meiyu-minapp/src/layouts/default.vue) and [src/layouts/common.vue](/d:/code/meiyu/meiyu-minapp/src/layouts/common.vue).

## High-Risk Areas
- Do not casually upgrade or overwrite files under [src/uni_modules](/d:/code/meiyu/meiyu-minapp/src/uni_modules).
- In particular, [src/uni_modules/piaoyi-editor](/d:/code/meiyu/meiyu-minapp/src/uni_modules/piaoyi-editor) appears to have local modifications and should be treated as patched vendor code.
- Before changing shared globals in [src/stores/common.ts](/d:/code/meiyu/meiyu-minapp/src/stores/common.ts), inspect all usages because many pages depend on them implicitly.
- Before changing request/response behavior, inspect both [src/utils/request.ts](/d:/code/meiyu/meiyu-minapp/src/utils/request.ts) and [src/utils/http.ts](/d:/code/meiyu/meiyu-minapp/src/utils/http.ts).

## Editing Guidelines
- Prefer adding new business pages under `src/pagesA` unless the feature truly belongs to the root package or `pagesB`.
- If a route, navigation title, or page layout changes, update the config source files instead of editing generated JSON first.
- Reuse existing request wrappers, store patterns, and shared selection state where possible.
- Keep changes local to the business module being edited. Avoid broad refactors unless required.
- If Chinese text looks garbled in terminal output, verify the file encoding in an editor before bulk-rewriting user-facing copy.

## Good First Files To Read For Most Tasks
- [package.json](/d:/code/meiyu/meiyu-minapp/package.json)
- [vite.config.ts](/d:/code/meiyu/meiyu-minapp/vite.config.ts)
- [pages.config.ts](/d:/code/meiyu/meiyu-minapp/pages.config.ts)
- [src/pages/index.vue](/d:/code/meiyu/meiyu-minapp/src/pages/index.vue)
- [src/utils/http.ts](/d:/code/meiyu/meiyu-minapp/src/utils/http.ts)
- [src/stores/modules/user.ts](/d:/code/meiyu/meiyu-minapp/src/stores/modules/user.ts)
- [docs/PROJECT_OVERVIEW.md](/d:/code/meiyu/meiyu-minapp/docs/PROJECT_OVERVIEW.md)

## Suggested Change Checklist
- Confirm which package the page belongs to: root, `pagesA`, or `pagesB`.
- Check whether the feature already has a shared store or helper.
- Verify whether the request must carry `storeId`.
- Avoid editing generated route/manifest outputs directly.
- If touching vendorized modules, document why.
- Run `pnpm type-check` and `pnpm lint` after meaningful code changes.
