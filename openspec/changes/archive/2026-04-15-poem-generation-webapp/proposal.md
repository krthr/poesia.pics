## Why

poesia.pics needs its core functionality: a public webapp where anyone can upload a photo and receive an AI-generated poem inspired by that image. The poem's mood, language, and literary voice are configurable, creating a curated creative experience. Poems are ephemeral by design — they expire after 24 hours, reinforcing the fleeting nature of the moment that inspired them. An admin panel allows managing the creative catalog (moods, voices, prompts) without code changes.

## What Changes

- Add database schema: `languages`, `moods`, `voices`, and `poems` tables with soft-delete support
- Build public multi-page flow: landing → generate (upload + mood + voice selection) → poem display
- Integrate Gemini AI (`@google/genai`) for single-step image-to-poem generation
- Add shareable poem pages with social sharing and PNG image generation (satori)
- Implement i18n (ES/EN) with browser detection and visual toggle
- Build admin CRUD for moods, voices (with editable prompt_hint), and poem viewing
- Add scheduled job to soft-delete poems older than 24 hours
- Add rate limiting on generation endpoints
- Set up Tailwind CSS with minimalist aesthetic and classic typography

## Capabilities

### New Capabilities
- `data-model`: Database schema for languages, moods, voices, and poems with migrations and Lucid models
- `poem-generation`: Public flow for uploading images and generating poems via Gemini AI
- `poem-display`: Poem viewing page with expiration handling, sharing, and PNG image generation
- `i18n`: Internationalization setup with ES/EN support, browser detection, and language toggle
- `admin-panel`: Authenticated CRUD for managing moods, voices, and viewing poems
- `cleanup-scheduler`: Scheduled job to soft-delete expired poems every hour
- `rate-limiting`: Rate limiting on public generation and image endpoints
- `frontend-setup`: Tailwind CSS configuration with minimalist design and classic fonts

### Modified Capabilities
(none — this is a greenfield build on the existing AdonisJS scaffold)

## Impact

- **Dependencies**: Adds `@google/genai`, `@adonisjs/i18n`, `@adonisjs/queue`, `@adonisjs/limiter`, `tailwindcss`, `@tailwindcss/vite`, `satori`, `@resvg/resvg-js`, and web fonts
- **Database**: 4 new tables (languages, moods, voices, poems) + queue and rate_limits tables from AdonisJS packages
- **File system**: Image uploads stored at `storage/uploads/poems/`
- **External services**: Gemini API (requires `GEMINI_API_KEY` env var)
- **Existing code**: Routes file will be extended; existing auth system used for admin; existing layout component extended with language toggle
