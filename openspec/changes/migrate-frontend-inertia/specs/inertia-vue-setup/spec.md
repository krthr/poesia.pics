## ADDED Requirements

### Requirement: Inertia adapter configured with AdonisJS
The system SHALL use `@adonisjs/inertia` as the bridge between AdonisJS controllers and Vue 3 frontend. The Inertia provider and commands SHALL be registered in `adonisrc.ts`. A root Edge template `inertia_layout.edge` SHALL serve as the HTML shell.

#### Scenario: Inertia renders a Vue page
- **WHEN** a controller calls `inertia.render('Home', { title: 'Hello' })`
- **THEN** the system serves the `inertia_layout.edge` shell with the Inertia page data embedded, and the Vue app mounts the `Home.vue` component with `{ title: 'Hello' }` as props

### Requirement: Vue 3 app entrypoint with Nuxt UI
The app entrypoint at `inertia/app/app.ts` SHALL create a Vue 3 app, register the Nuxt UI vue-plugin, set up a router instance for Nuxt UI, and mount Inertia's `createInertiaApp`. Pages SHALL be resolved from `inertia/pages/`.

#### Scenario: App boots with Nuxt UI components available
- **WHEN** the app entrypoint initializes
- **THEN** all Nuxt UI components (UButton, UInput, UTable, etc.) are auto-imported and available in all Vue SFCs without explicit imports

### Requirement: Vite plugin chain
The `vite.config.ts` SHALL use three plugins in order: `@adonisjs/inertia/client`, `@vitejs/plugin-vue`, and `@nuxt/ui/vite`. The `@adonisjs/vite/client` and `@tailwindcss/vite` plugins SHALL be removed.

#### Scenario: Dev server starts with HMR
- **WHEN** `node ace serve --hmr` is run
- **THEN** the dev server starts, Vite compiles Vue SFCs, Nuxt UI components auto-import, and Tailwind v4 styles apply correctly

### Requirement: Base layout component
A Vue layout component `inertia/layouts/Default.vue` SHALL wrap all pages with the common shell: header with navigation, main content area, and footer. It SHALL use Nuxt UI components where appropriate.

#### Scenario: Page renders inside layout
- **WHEN** any page component is rendered
- **THEN** it appears inside the default layout with header navigation, main content area, and footer

### Requirement: Inertia middleware shares global data
The `InertiaMiddleware` SHALL share the following data on every response: current locale, translation messages for the current locale, authenticated user (if any), flash messages (error, success), and validation errors.

#### Scenario: Shared data available on every page
- **WHEN** any Inertia page renders
- **THEN** `usePage().props` contains `locale`, `messages`, `flash`, `errors`, and `user` (or undefined if not authenticated)

### Requirement: CSS entrypoint uses Nuxt UI
The CSS entrypoint SHALL import Tailwind and Nuxt UI via `@import "tailwindcss"` and `@import "@nuxt/ui"`. The previous direct `@tailwindcss/vite` integration is replaced by Nuxt UI's vite plugin.

#### Scenario: Nuxt UI styles apply
- **WHEN** a page uses a Nuxt UI component like `<UButton>`
- **THEN** the component renders with correct Nuxt UI styling including Tailwind utility classes
