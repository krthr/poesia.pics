## Why

The current Edge + Alpine.js frontend works but limits interactivity to simple sprinkles. As the app grows (richer admin UI, better form UX, loading states), we need a component model. Inertia.js bridges AdonisJS and Vue 3 without turning the backend into a JSON API, and Nuxt UI v4 provides a polished component library that works standalone with Vue — giving us a modern SPA feel while keeping server-driven routing.

## What Changes

- **BREAKING**: All Edge templates (`resources/views/**/*.edge`) replaced by Vue 3 SFCs (`inertia/pages/**/*.vue`)
- **BREAKING**: Alpine.js removed — Vue reactivity replaces all client-side behavior
- Replace `@adonisjs/vite` with `@adonisjs/inertia` as the frontend bridge
- Add Vue 3 + `@vitejs/plugin-vue` as the rendering layer
- Add Nuxt UI v4 (`@nuxt/ui`) in standalone Vue mode for UI components
- Controllers change from `view.render()` to `inertia.render()` with typed props
- Flash messages and validation errors delivered via Inertia shared data instead of Edge flash
- i18n translations shared to Vue via Inertia middleware (server stays source of truth)
- File upload on `/generate` uses Inertia's `useForm()` with progress tracking
- Single Edge template remains: `inertia_layout.edge` (the HTML shell)

## Capabilities

### New Capabilities
- `inertia-vue-setup`: Inertia.js + Vue 3 + Nuxt UI v4 scaffold — vite config, app entrypoint, layout component, Inertia middleware with shared data (i18n, auth, flash)
- `vue-pages`: All page components migrated from Edge to Vue SFCs — home, generate, poem, auth (login/signup), admin (moods CRUD, voices CRUD, poems list), error pages
- `vue-i18n-composable`: Thin client-side composable that reads i18n translations from Inertia shared props — no new i18n dependency

### Modified Capabilities
- `frontend-setup`: Tailwind/Vite config changes to use Nuxt UI plugin instead of direct @tailwindcss/vite; entry points change from Edge to Inertia
- `i18n`: Translation delivery mechanism changes from Edge template helpers to Inertia shared data; translation files and server-side config unchanged
- `poem-generation`: Generate form switches from Edge + Alpine to Vue SFC with Inertia useForm(); controller changes render method
- `poem-display`: Poem page switches from Edge to Vue SFC; controller changes render method
- `admin-panel`: All admin pages switch from Edge to Vue SFCs with Nuxt UI table/form components; controllers change render method

## Impact

- **Dependencies added**: `@adonisjs/inertia`, `@inertiajs/vue3`, `vue`, `@vitejs/plugin-vue`, `@nuxt/ui`
- **Dependencies removed**: `alpinejs`, `@types/alpinejs`, `@adonisjs/vite`, `edge.js` (eventually)
- **All controllers**: `view.render()` → `inertia.render()` with explicit props objects
- **Vite config**: Complete rewrite — new plugin chain
- **adonisrc.ts**: Add inertia provider/commands, remove edge provider after migration
- **New directory**: `inertia/` (pages, layouts, composables, app entrypoint)
- **Removed directory**: `resources/views/` (after migration complete)
- **No backend logic changes**: models, services, validators, middleware, routes all stay
