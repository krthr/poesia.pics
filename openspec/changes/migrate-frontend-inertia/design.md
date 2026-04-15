## Context

The app currently renders HTML server-side with Edge templates and uses Alpine.js for light interactivity (mood/voice cascade on the generate form, flash alert animations). Tailwind v4 is integrated via `@tailwindcss/vite`. There are ~10 pages across public, auth, and admin areas. The backend is AdonisJS 7 with session auth, i18n (es/en), SQLite, and Lucid ORM.

The migration replaces the rendering layer while keeping all backend logic (models, services, validators, middleware, routes) intact.

## Goals / Non-Goals

**Goals:**
- Replace Edge templates with Vue 3 SFCs rendered via Inertia.js
- Adopt Nuxt UI v4 as the component library (standalone Vue mode)
- Maintain server-side i18n as the single source of truth
- Preserve all existing functionality with zero behavior changes
- Enable page-by-page migration with Edge and Inertia coexisting

**Non-Goals:**
- SSR (server-side rendering via Inertia) — not needed for this app's scale
- Client-side routing beyond what Inertia provides (no vue-router)
- Redesigning the UI — same visual output, just different component tech
- Adding new features during migration

## Decisions

### 1. Inertia.js as the bridge (not a JSON API + SPA)

Inertia keeps AdonisJS as the router and controller layer. Controllers pass props to Vue pages instead of Edge views. No API serialization layer needed.

**Alternative considered**: Full Nuxt frontend with AdonisJS as API. Rejected — doubles the infrastructure, requires API serialization for every endpoint, and the app's simplicity doesn't justify it.

### 2. Nuxt UI v4 standalone Vue mode

Nuxt UI v4 officially supports Vue without Nuxt via `@nuxt/ui/vite` plugin and `@nuxt/ui/vue-plugin`. Components are auto-imported. Tailwind v4 is handled by the Nuxt UI vite plugin.

**Alternative considered**: shadcn-vue (copy-paste components). Rejected — Nuxt UI provides a more cohesive, maintained set with less manual wiring.

### 3. i18n via Inertia shared data + thin composable

The InertiaMiddleware shares `{ locale, messages }` on every response. A `useI18n()` composable on the client reads translations from `usePage().props`. Simple string interpolation for `{name}`-style placeholders (matches current usage).

**Alternative considered**: vue-i18n package on the client. Rejected — adds a dependency for 75 keys. The composable is ~15 lines. If ICU features are needed later (plurals, selects), we can add `intl-messageformat` then.

### 4. No vue-router — Inertia handles navigation

Inertia provides its own `<Link>` component and `router.visit()` for SPA-style navigation. AdonisJS routes remain the source of truth. The Nuxt UI vue-plugin requires a router instance, so we'll create a minimal vue-router instance that Inertia controls.

### 5. Vite plugin chain

```
@adonisjs/inertia/client  →  handles Inertia entrypoints + HMR
@vitejs/plugin-vue         →  Vue SFC compilation
@nuxt/ui/vite              →  Nuxt UI auto-imports + Tailwind v4
```

The `@adonisjs/vite/client` and `@tailwindcss/vite` plugins are replaced entirely.

### 6. Page-by-page migration with coexistence

During migration, some routes render Edge (`view.render()`) and others render Inertia (`inertia.render()`). Both providers coexist in `adonisrc.ts`. Once all pages are migrated, Edge provider and templates are removed.

### 7. Controller prop shape

Each controller explicitly passes typed props. No automatic model serialization — keeps props predictable and decoupled from Lucid internals.

```ts
// Before
return view.render('pages/generate', { moods, voicesByMood })

// After
return inertia.render('Generate', { moods, voicesByMood })
```

## Risks / Trade-offs

**[Nuxt UI vite plugin compatibility with AdonisJS vite setup]** → The AdonisJS Inertia vite plugin and Nuxt UI vite plugin both need to coexist. Test early during scaffold phase. Fallback: use Nuxt UI components with explicit imports instead of auto-imports.

**[Bundle size increase]** → Vue 3 + Nuxt UI adds ~60-80KB gzipped to the client. Acceptable for this app — Edge templates were sending full HTML on every navigation anyway. Inertia's subsequent navigations send only JSON.

**[ICU message format on client]** → Current translations use simple `{name}` placeholders only. The thin composable handles this. If ICU plurals/selects are added later, the composable needs `intl-messageformat`. Low risk — current translation surface doesn't use them.

**[Flash message timing]** → Inertia shares flash data differently than Edge. Session flash is read in `InertiaMiddleware.share()` and delivered as props. Must ensure flash messages are consumed correctly (one-time read).

## Migration Plan

1. **Scaffold** — Install deps, configure vite, create `inertia_layout.edge`, app entrypoint, base layout, i18n composable
2. **Migrate public pages** — Home, Generate, Poem (most user-visible, validates the full flow)
3. **Migrate auth pages** — Login, Signup
4. **Migrate admin pages** — Moods CRUD, Voices CRUD, Poems list
5. **Migrate error pages** — 404, 500
6. **Cleanup** — Remove Edge templates, Alpine.js, `@adonisjs/vite`, `edge.js`

**Rollback**: Git revert. No data migration involved — this is purely a rendering layer change.
