## 1. Dependencies & Configuration

- [x] 1.1 Install Tailwind CSS and @tailwindcss/vite, configure in vite.config.ts, update resources/css/app.css with `@import "tailwindcss"` directive
- [x] 1.2 Add web fonts (Playfair Display, Lora) and configure Tailwind theme with custom font families
- [x] 1.3 Install @adonisjs/i18n via `node ace add @adonisjs/i18n`, configure default locale `es` and supported locales `[es, en]`
- [x] 1.4 Install @adonisjs/queue via `node ace add @adonisjs/queue` with database backend, run migrations
- [x] 1.5 Install @adonisjs/limiter via `node ace add @adonisjs/limiter` with database backend, run migrations
- [x] 1.6 Install @google/genai package
- [x] 1.7 Install satori and @resvg/resvg-js packages
- [x] 1.8 Add GEMINI_API_KEY to .env.example and start/env.ts validation

## 2. Data Model

- [x] 2.1 Create migration and Lucid model for Language (id, name, code)
- [x] 2.2 Create migration and Lucid model for Mood (id, slug, created_at, updated_at)
- [x] 2.3 Create migration and Lucid model for Voice (id, name, language_id, mood_id, prompt_hint, active, created_at, updated_at) with foreign keys
- [x] 2.4 Create migration and Lucid model for Poem (id, voice_id, image_path, image_desc, content, created_at, deleted_at) with foreign key and soft delete support
- [x] 2.5 Define Lucid relationships: Language hasMany Voice, Mood hasMany Voice, Voice belongsTo Language/Mood and hasMany Poem, Poem belongsTo Voice
- [x] 2.6 Create database seeder for languages (es, en) and initial moods (melancholic, romantic, erotic)

## 3. i18n Setup

- [x] 3.1 Create resources/lang/es/messages.json with all Spanish translations (UI text, mood labels, mood descriptions, error messages, expiration message)
- [x] 3.2 Create resources/lang/en/messages.json with all English translations
- [x] 3.3 Configure detect_user_locale_middleware to read Accept-Language and store locale in session
- [x] 3.4 Create language toggle route (GET /lang/:code) that updates session locale and redirects back
- [x] 3.5 Add language toggle component (ES | EN) to the site header/layout

## 4. Frontend & Layout

- [x] 4.1 Update the layout component with Tailwind styles, minimalist design, custom fonts, and language toggle
- [x] 4.2 Build the landing page (GET /) with poetic description and CTA to /generate
- [x] 4.3 Build the generate page (GET /generate) with image upload, mood selector, and voice selector
- [x] 4.4 Add Alpine.js interaction on generate page: mood selection filters voices via fetch or inline data (mood × language → active voices)
- [x] 4.5 Build the poem display page (GET /poem/:id) showing image, poem content, voice name, mood label
- [x] 4.6 Build the expired poem view on /poem/:id (expiration message + CTA) shown when deleted_at is set
- [x] 4.7 Add share button (copy link to clipboard) and download image button to poem page

## 5. Poem Generation (Gemini Integration)

- [x] 5.1 Create a GeminiService (app/services/gemini_service.ts) that accepts an image buffer and prompt, calls Gemini 2.5 Flash with base64 image, and returns the generated text
- [x] 5.2 Build the system prompt template that assembles voice.name, voice.prompt_hint, mood.slug, and language.code into a coherent instruction
- [x] 5.3 Create GenerateController handling POST /generate: validate input, save image to storage/uploads/poems/{uuid}.{ext}, call GeminiService, create Poem record, redirect to /poem/:id
- [x] 5.4 Add image serving route (GET /uploads/poems/:filename) that reads from storage directory, checking poem existence
- [x] 5.5 Handle Gemini errors gracefully: display user-friendly error, clean up uploaded image on failure

## 6. Shareable Image Generation

- [x] 6.1 Create a PoemImageService (app/services/poem_image_service.ts) using satori + @resvg/resvg-js that takes poem data and generates a styled PNG
- [x] 6.2 Define the satori layout: photo (top), poem text (center), voice attribution, "poesia.pics" branding (bottom), using site fonts
- [x] 6.3 Create route GET /poem/:id/image that returns the PNG (Content-Type: image/png), returns 404 for expired poems

## 7. Admin Panel

- [x] 7.1 Create admin layout component extending the base layout with admin navigation
- [x] 7.2 Build MoodsController and views: list (/admin/moods), create, edit, delete (with voice association check)
- [x] 7.3 Build VoicesController and views: list (/admin/voices), create (with language/mood selects and prompt_hint textarea), edit, delete
- [x] 7.4 Build PoemsController (admin) and view: paginated list (/admin/poems) showing content preview, voice, mood, language, dates, and soft-delete status
- [x] 7.5 Register all admin routes under /admin group with auth middleware

## 8. Cleanup Scheduler

- [ ] 8.1 Create CleanupExpiredPoems job that queries poems older than 24h with null deleted_at and sets deleted_at to current timestamp
- [ ] 8.2 Register the job in start/scheduler.ts to run every hour
- [ ] 8.3 Verify the worker runs correctly via `node ace queue:work`

## 9. Rate Limiting

- [ ] 9.1 Define throttle middleware for POST /generate (5 requests / 10 minutes / IP)
- [ ] 9.2 Define throttle middleware for GET /poem/:id/image (10 requests / hour / IP)
- [ ] 9.3 Register rate limit middleware on the corresponding routes in start/routes.ts

## 10. Routes & Wiring

- [ ] 10.1 Wire all public routes in start/routes.ts: GET /, GET /generate, POST /generate, GET /poem/:id, GET /poem/:id/image, GET /lang/:code, GET /uploads/poems/:filename
- [ ] 10.2 Wire all admin routes under /admin group with auth middleware
- [ ] 10.3 Run full migration and seed, verify application starts with `node ace serve --hmr`
