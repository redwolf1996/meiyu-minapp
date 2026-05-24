# Project Overview

## What This App Does
This repository is a merchant-oriented beauty booking mini program. The current entry flow sends authenticated users to the business dashboard and unauthenticated users to the business login page.

## Tech Stack
- `uni-app`
- `Vue 3` with `<script setup>`
- `TypeScript`
- `Pinia` with persisted state
- `UnoCSS`
- `wot-design-uni`
- `vite` + `uni-helper` plugins

## Directory Map
- [src/main.ts](/d:/code/meiyu/meiyu-minapp/src/main.ts): app bootstrap and Pinia registration
- [src/App.vue](/d:/code/meiyu/meiyu-minapp/src/App.vue): app lifecycle hooks and update manager handling
- [src/pages](/d:/code/meiyu/meiyu-minapp/src/pages): root package pages, currently kept minimal
- [src/pagesA](/d:/code/meiyu/meiyu-minapp/src/pagesA): main merchant/business subpackage
- [src/pagesB](/d:/code/meiyu/meiyu-minapp/src/pagesB): customer-side subpackage
- [src/components](/d:/code/meiyu/meiyu-minapp/src/components): shared business components
- [src/layouts](/d:/code/meiyu/meiyu-minapp/src/layouts): page layout wrappers
- [src/stores](/d:/code/meiyu/meiyu-minapp/src/stores): Pinia stores plus cross-page shared refs
- [src/utils](/d:/code/meiyu/meiyu-minapp/src/utils): request layer and general utilities
- [src/uni_modules](/d:/code/meiyu/meiyu-minapp/src/uni_modules): vendored local modules, treat carefully
- [protocols](/d:/code/meiyu/meiyu-minapp/protocols): local protocol HTML files

## Routing Notes
- Routing source is [pages.config.ts](/d:/code/meiyu/meiyu-minapp/pages.config.ts).
- The root package intentionally contains very little.
- Subpackages are declared as:
  - `src/pagesA`: merchant workflows such as login, dashboard, booking, billing, customer, product, staff, order, message center, onboarding steps
  - `src/pagesB`: customer-side pages
- Generated [src/pages.json](/d:/code/meiyu/meiyu-minapp/src/pages.json) mirrors the config and should mostly be viewed as output.

## Runtime And Env
- Environment variables are defined in:
  - [.env](/d:/code/meiyu/meiyu-minapp/.env)
  - [.env.development](/d:/code/meiyu/meiyu-minapp/.env.development)
  - [.env.production](/d:/code/meiyu/meiyu-minapp/.env.production)
- `VITE_BASE_URL` controls the API host.
- `VITE_ENV_VERSION` is forwarded in request headers.
- `VITE_APP_IMG_BASE` is used for static asset URLs such as default avatar images.

## Networking Model
- [src/utils/request.ts](/d:/code/meiyu/meiyu-minapp/src/utils/request.ts) exposes `get/post/put/delete`.
- [src/utils/http.ts](/d:/code/meiyu/meiyu-minapp/src/utils/http.ts) centralizes:
  - base URL prefixing
  - timeout
  - auth header
  - current store header
  - token expiry redirect
  - toast-based error feedback

## State Model
- [src/stores/modules/user.ts](/d:/code/meiyu/meiyu-minapp/src/stores/modules/user.ts) is the main persisted identity store.
- [src/stores/modules/business.ts](/d:/code/meiyu/meiyu-minapp/src/stores/modules/business.ts) stores merchant-level business info.
- [src/stores/common.ts](/d:/code/meiyu/meiyu-minapp/src/stores/common.ts) contains many shared refs used as transient cross-page state, such as:
  - current customer
  - current billing context
  - selected cards, services, products
  - current `storeId`
  - list caches for staff and payment types

## Notable Implementation Conventions
- Many pages rely on auto-imported globals from `src/stores`, `src/utils`, and `src/hooks`.
- A lot of feature flow state is shared through refs instead of route params.
- `pagesA/tabs` acts as the main merchant tab surface.
- Layout usage is selective. Some pages explicitly disable layout or use `common`.

## Risk Notes
- Local vendor modules under [src/uni_modules](/d:/code/meiyu/meiyu-minapp/src/uni_modules) are part of the app behavior, not disposable dependencies.
- The editor module under [src/uni_modules/piaoyi-editor](/d:/code/meiyu/meiyu-minapp/src/uni_modules/piaoyi-editor) is especially likely to contain project-specific patches.
- Generated files and config sources coexist. Prefer editing the sources.
- Some terminal reads show garbled Chinese comments or copy; verify in an editor before normalizing text.

## Recommended Process For Future Changes
1. Find the page or module in `src/pagesA` or `src/pagesB`.
2. Check whether it already depends on shared state from [src/stores/common.ts](/d:/code/meiyu/meiyu-minapp/src/stores/common.ts).
3. Follow the existing request wrapper instead of calling `uni.request` directly.
4. Update route or manifest source config only when navigation or packaging changes.
5. Run `pnpm type-check` and `pnpm lint` before finishing a non-trivial change.
