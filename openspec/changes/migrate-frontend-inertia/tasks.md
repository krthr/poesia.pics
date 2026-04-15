## 1. Scaffold Inertia + Vue + Nuxt UI

- [x] 1.1 Install dependencies: `@adonisjs/inertia`, `@inertiajs/vue3`, `vue`, `@vitejs/plugin-vue`, `@nuxt/ui`
- [ ] 1.2 Run `node ace configure @adonisjs/inertia` (select Vue adapter, no SSR)
- [ ] 1.3 Update `vite.config.ts` with plugin chain: `@adonisjs/inertia/client`, `@vitejs/plugin-vue`, `@nuxt/ui/vite` — remove `@adonisjs/vite/client` and `@tailwindcss/vite`
- [ ] 1.4 Update `adonisrc.ts`: add inertia provider and commands, keep edge provider for coexistence
- [ ] 1.5 Create `resources/views/inertia_layout.edge` HTML shell with `@inertia` tag and `isolate` class on root div
- [ ] 1.6 Create `inertia/css/app.css` with `@import "tailwindcss"` and `@import "@nuxt/ui"`
- [ ] 1.7 Create `inertia/app/app.ts` entrypoint: createInertiaApp, register Nuxt UI vue-plugin, resolve pages from `../pages/`
- [ ] 1.8 Verify dev server starts with `node ace serve --hmr` — no build errors

## 2. Shared Data and i18n Composable

- [ ] 2.1 Create/update `app/middleware/inertia_middleware.ts` to share: `locale`, `messages` (full bag from `i18n`), `user`, `flash` (error/success), and `errors` (validation)
- [ ] 2.2 Create `inertia/composables/useI18n.ts` with `t(key, replacements?)` and reactive `locale`
- [ ] 2.3 Test composable: simple key, placeholder replacement, missing key fallback

## 3. Default Layout

- [ ] 3.1 Create `inertia/layouts/Default.vue` with header (nav links, auth state, language toggle), main content slot, and footer
- [ ] 3.2 Wire language toggle to Inertia visit to `/lang/:code`
- [ ] 3.3 Wire auth links (login, signup, logout) using Inertia `<Link>` and `<Form>`

## 4. Public Pages

- [ ] 4.1 Create `inertia/pages/Home.vue` — headline, subtitle, CTA
- [ ] 4.2 Update home route: replace `router.on('/').render('pages/home')` with a controller using `inertia.render('Home')`
- [ ] 4.3 Create `inertia/pages/Generate.vue` — file upload, mood toggles, voice dropdown, Inertia `useForm()` submission
- [ ] 4.4 Update `GenerateController.create` to use `inertia.render('Generate', { moods, voicesByMood })`
- [ ] 4.5 Update `GenerateController.store` to return Inertia-compatible responses (redirect on success, back with errors on failure)
- [ ] 4.6 Create `inertia/pages/Poem.vue` — image, content, attribution, share/copy button, download button, expired state
- [ ] 4.7 Update `PoemController.show` to use `inertia.render('Poem', { poem })`
- [ ] 4.8 Verify full generate → poem flow end-to-end

## 5. Auth Pages

- [ ] 5.1 Create `inertia/pages/Auth/Login.vue` — email/password form with Nuxt UI components and `useForm()`
- [ ] 5.2 Create `inertia/pages/Auth/Signup.vue` — name/email/password form with Nuxt UI components and `useForm()`
- [ ] 5.3 Update `SessionController` (create/store) to use `inertia.render()` and Inertia-compatible redirects
- [ ] 5.4 Update `NewAccountController` (create/store) to use `inertia.render()` and Inertia-compatible redirects
- [ ] 5.5 Verify login/signup/logout flow end-to-end

## 6. Admin Pages

- [ ] 6.1 Create `inertia/pages/Admin/Moods/Index.vue` — UTable with slug, edit/delete actions
- [ ] 6.2 Create `inertia/pages/Admin/Moods/Form.vue` — create/edit form with Nuxt UI components
- [ ] 6.3 Update `AdminMoodsController` to use `inertia.render()` with explicit props
- [ ] 6.4 Create `inertia/pages/Admin/Voices/Index.vue` — UTable with name, mood, language, active status, actions
- [ ] 6.5 Create `inertia/pages/Admin/Voices/Form.vue` — form with name, prompt hint, mood select, language select, active toggle
- [ ] 6.6 Update `AdminVoicesController` to use `inertia.render()` with explicit props
- [ ] 6.7 Create `inertia/pages/Admin/Poems/Index.vue` — UTable with content preview, status badge, voice name
- [ ] 6.8 Update `AdminPoemsController` to use `inertia.render()` with explicit props
- [ ] 6.9 Verify admin CRUD flows: create/edit/delete moods, create/edit/toggle voices, view poems

## 7. Error Pages

- [ ] 7.1 Create `inertia/pages/Errors/NotFound.vue` — translated 404 message with home link
- [ ] 7.2 Create `inertia/pages/Errors/ServerError.vue` — translated 500 message with home link
- [ ] 7.3 Configure Inertia error page rendering in `config/inertia.ts`

## 8. Cleanup

- [ ] 8.1 Remove all Edge templates from `resources/views/`
- [ ] 8.2 Remove `resources/js/app.js` (Alpine.js entrypoint)
- [ ] 8.3 Remove `resources/css/app.css` (old entrypoint)
- [ ] 8.4 Uninstall `alpinejs`, `@types/alpinejs`, `@adonisjs/vite`, `edge.js`
- [ ] 8.5 Remove `edge_provider` from `adonisrc.ts` providers
- [ ] 8.6 Remove Edge-related `metaFiles` pattern from `adonisrc.ts`
- [ ] 8.7 Final verification: all pages render, all flows work, no Edge/Alpine references remain
