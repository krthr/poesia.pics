## MODIFIED Requirements

### Requirement: Tailwind CSS integration
Tailwind v4 SHALL be integrated via the `@nuxt/ui/vite` plugin instead of `@tailwindcss/vite`. The CSS entrypoint SHALL use `@import "tailwindcss"` and `@import "@nuxt/ui"`. All existing Tailwind utility classes SHALL continue to work.

#### Scenario: Tailwind classes render correctly
- **WHEN** a Vue component uses Tailwind utility classes (e.g., `bg-stone-50`, `text-lg`)
- **THEN** the styles apply correctly via the Nuxt UI vite plugin's Tailwind integration

### Requirement: Classic typography
Font families (Playfair Display, Lora) SHALL be loaded and available in Vue components via the same Tailwind `font-display` and `font-serif` utilities.

#### Scenario: Fonts loaded on page
- **WHEN** any page renders inside the default layout
- **THEN** headings use Playfair Display and body text uses Lora

### Requirement: Landing page
The landing page at `/` SHALL be rendered by the `Home.vue` Inertia page component instead of the `pages/home.edge` template. The controller SHALL use `inertia.render('Home')` instead of `router.on('/').render('pages/home')`.

#### Scenario: User visits landing page
- **WHEN** a user navigates to `/`
- **THEN** the Home.vue component renders with headline, subtitle, and CTA, served via Inertia

## REMOVED Requirements

### Requirement: Minimalist aesthetic
**Reason**: The aesthetic is now provided by Nuxt UI's design system and component defaults rather than hand-coded Edge template styles. The visual intent (minimalist, stone palette) is preserved in the Vue components.
**Migration**: Styling moves to Vue SFCs using Nuxt UI components and Tailwind utilities.
