## Context

poesia.pics is a fresh AdonisJS 7 scaffold with auth (session-based), SQLite via Lucid ORM, Edge templates, Alpine.js, and Vite already configured. There is a User model, login/signup flows, and basic layout components. The project needs its core feature: AI-powered poem generation from images.

The existing auth system will be reused for admin access. The public flow is entirely anonymous.

## Goals / Non-Goals

**Goals:**
- Public users can upload an image, select a mood and voice, and receive an AI-generated poem
- Admin can manage the creative catalog (moods, voices with prompt_hints) via a web panel
- Poems expire after 24h (soft delete) with a graceful expiration page
- Users can share poems via link and download a styled PNG image
- Full ES/EN support with automatic browser detection and manual toggle

**Non-Goals:**
- User accounts or saved history for public users
- Real-time/WebSocket features
- Multiple AI providers (Gemini only for now)
- Image moderation or content filtering (future concern)
- Mobile app or API-first design
- Payment or premium tiers

## Decisions

### 1. Single-step AI pipeline (Gemini multimodal)

Send the uploaded image + a system prompt directly to Gemini in one request. The system prompt is assembled dynamically from `voice.prompt_hint`, `mood.slug`, and `language.code`.

**Why over two-step (vision → LLM):** Simpler architecture, lower latency, lower cost. The single-step approach with modern multimodal models produces high-quality results. We store `image_desc` as an optional field that can be populated later if needed for admin/debugging.

**Model:** `gemini-2.5-flash` — fast, cheap, good quality for creative text.

### 2. SQLite for everything (app DB, queue, rate limits)

All three AdonisJS packages (`@adonisjs/lucid`, `@adonisjs/queue`, `@adonisjs/limiter`) use the same SQLite database.

**Why over Redis/Postgres:** Single-file deployment, zero infrastructure, appropriate for the expected traffic. SQLite handles concurrent reads well and the write volume (poem generation + cleanup) is low. If the app outgrows SQLite, migrating to Postgres is straightforward with Lucid's adapter system.

### 3. Satori + resvg for shareable image generation

Use Vercel's `satori` library to render an HTML/CSS layout into SVG, then `@resvg/resvg-js` to convert to PNG. The layout includes the original photo, poem text, voice attribution, and branding.

**Why over Sharp compositing:** Satori supports CSS flexbox, custom fonts, and text wrapping natively. This matches the site's typography and produces elegant results. Sharp would require manual pixel math for text layout.

**Why over headless browser (Puppeteer):** No heavy dependency, no Chrome binary to deploy. Satori is a pure JS/Wasm solution.

### 4. Server-rendered multi-page flow

The public flow uses standard AdonisJS routes + Edge templates with full page loads between steps. Alpine.js is used only for interactive elements within a page (e.g., mood → voice filtering on the generate form).

**Why over SPA/Alpine-driven flow:** Simpler to build, better SEO for shared poem pages, progressive enhancement works out of the box. The generate form benefits from Alpine for the mood→voice cascade, but full navigation is server-driven.

### 5. Moods stored as slugs with i18n for display

Moods are stored in the database with a `slug` field (e.g., `melancholic`). All user-facing text (name, description) lives in `resources/lang/{locale}/messages.json` keyed by `moods.{slug}` and `moods.{slug}.description`.

**Why over translated columns in DB:** Keeps translation concerns in the i18n system where they belong. Adding a new language doesn't require DB migration. Admin creates moods by slug; translations are managed in lang files.

### 6. Soft delete with `deleted_at` on poems

A scheduled job runs every hour, finds poems where `created_at < now() - 24h AND deleted_at IS NULL`, and sets `deleted_at = now()`. Images remain on disk. The public poem page checks `deleted_at` and renders an expiration message instead of 404.

**Why soft delete over hard delete:** Preserves data for admin stats and analytics. Allows potential "undelete" if needed. The `/poem/:id` URL always resolves — it just shows different content based on expiration state.

**Why keep images on disk:** Avoids complexity of cleanup. Disk is cheap. A future job could clean up old images if storage becomes a concern.

### 7. Image storage in `storage/uploads/poems/`

Uploaded images are saved to `storage/uploads/poems/{uuid}.{ext}` using AdonisJS Drive (local disk). The `uuid` is generated at upload time and stored in `poem.image_path`.

The `storage/` directory is outside `public/` — images are served through a controller route that checks poem existence and expiration state, not as static files.

### 8. Rate limiting on generation endpoint

`POST /generate` is limited to 5 requests per 10 minutes per IP. `GET /poem/:id/image` is limited to 10 requests per hour per IP. Uses `@adonisjs/limiter` with database backend.

**Why these limits:** Each generation costs money (Gemini API). The image generation endpoint is CPU-intensive (satori rendering). These limits prevent abuse while allowing normal usage.

### 9. Language detection flow

1. On first visit, `@adonisjs/i18n` middleware reads `Accept-Language` header
2. Resolved locale is stored in session
3. A visual toggle (ES | EN) in the header allows manual override, which updates the session
4. All voice queries filter by the current session locale's language

## Risks / Trade-offs

- **Gemini API availability** → The generation flow depends entirely on Gemini. If the API is down, generation fails. Mitigation: clear error message to the user; no retry logic (the user can try again manually).

- **Gemini content policy** → Gemini may refuse to generate content for certain image+mood combinations (especially "erotic"). Mitigation: handle refusal gracefully with a user-friendly message suggesting a different mood.

- **SQLite write contention under load** → If many poems are generated simultaneously, SQLite's single-writer lock could become a bottleneck. Mitigation: acceptable for expected traffic; migration path to Postgres exists.

- **Satori CSS subset** → Satori supports a subset of CSS (flexbox only, no grid). Complex layouts may require workarounds. Mitigation: the poem image layout is simple — photo + text + branding.

- **Disk storage growth** → Images are never deleted. Over time, disk usage grows unbounded. Mitigation: acceptable for now; a future cleanup job can purge images for soft-deleted poems older than N days.

- **No image validation** → Users could upload non-photo images or inappropriate content. Mitigation: basic file type/size validation at upload. Content moderation is a non-goal for v1.
