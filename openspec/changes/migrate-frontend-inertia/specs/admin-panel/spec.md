## MODIFIED Requirements

### Requirement: Mood CRUD
The moods admin pages SHALL be rendered by `inertia/pages/Admin/Moods/Index.vue` and `inertia/pages/Admin/Moods/Form.vue` instead of Edge templates. The controllers SHALL use `inertia.render()` with explicit props. List pages SHALL use Nuxt UI's `UTable` component. Forms SHALL use Nuxt UI form components (`UInput`, `UButton`, `UFormField`) with Inertia's `useForm()`. Delete actions SHALL use Inertia's `router.delete()`.

#### Scenario: Admin creates a mood
- **WHEN** an admin fills in the mood form and submits
- **THEN** Inertia POSTs to `/admin/moods` and redirects to the moods index on success with validation errors shown inline on failure

#### Scenario: Admin deletes mood with voices
- **WHEN** an admin clicks delete on a mood that has associated voices
- **THEN** a confirmation is shown (using Nuxt UI modal or native confirm), and on confirmation Inertia sends DELETE to `/admin/moods/:id`

### Requirement: Voice CRUD with prompt_hint editing
The voices admin pages SHALL be rendered by `inertia/pages/Admin/Voices/Index.vue` and `inertia/pages/Admin/Voices/Form.vue` instead of Edge templates. Forms SHALL include fields for name, prompt hint (textarea), mood (select), language (select), and active toggle using Nuxt UI components.

#### Scenario: Admin creates a voice
- **WHEN** an admin fills in the voice form with name, prompt hint, mood, language, and active status and submits
- **THEN** Inertia POSTs to `/admin/voices` and redirects to the voices index on success

#### Scenario: Admin edits prompt_hint
- **WHEN** an admin edits a voice's prompt hint and submits
- **THEN** Inertia PUTs to `/admin/voices/:id` and redirects to the voices index

#### Scenario: Admin toggles voice active status
- **WHEN** an admin toggles the active checkbox and submits
- **THEN** the voice's active status updates and the voices index reflects the change

### Requirement: Poems listing for admin
The poems admin page SHALL be rendered by `inertia/pages/Admin/Poems/Index.vue` instead of an Edge template. It SHALL use Nuxt UI's `UTable` to display poem content (truncated), status (active/expired), and voice name.

#### Scenario: Admin views poems list
- **WHEN** an authenticated user visits `/admin/poems`
- **THEN** a Nuxt UI table displays poems with content preview, status badge, and voice name
