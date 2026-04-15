## ADDED Requirements

### Requirement: Home page as Vue SFC
The `inertia/pages/Home.vue` component SHALL render the landing page with headline, subtitle, and CTA button linking to `/generate`. All text SHALL use the `t()` composable for i18n.

#### Scenario: User visits home page
- **WHEN** a user visits `/`
- **THEN** the Home.vue component renders with translated headline, subtitle, and a "Create a poem" CTA link

### Requirement: Generate page as Vue SFC with Inertia form
The `inertia/pages/Generate.vue` component SHALL render the poem generation form using Inertia's `useForm()`. It SHALL accept `moods` and `voicesByMood` as props. The mood selector SHALL be a set of toggle buttons. The voice selector SHALL be a dropdown that filters by selected mood. File upload, mood, and voice fields SHALL show validation errors from `form.errors`.

#### Scenario: User selects mood and sees filtered voices
- **WHEN** a user clicks a mood button
- **THEN** the voice dropdown updates to show only voices for that mood, and the previously selected voice resets

#### Scenario: User submits the form
- **WHEN** a user fills in image, mood, and voice and submits
- **THEN** Inertia POSTs the form data (multipart) to `/generate` and redirects to the poem page on success

#### Scenario: Validation error displayed inline
- **WHEN** the server returns a validation error for the image field
- **THEN** the error message appears below the image input without a full page reload

### Requirement: Poem page as Vue SFC
The `inertia/pages/Poem.vue` component SHALL accept a `poem` prop (with nested `voice` and `voice.mood`). It SHALL display the poem image, content, voice attribution, mood label, share button, download button, and "create another" link. For expired poems (where `deletedAt` is set), it SHALL show an expiration message with a CTA to create a new poem.

#### Scenario: Active poem displayed
- **WHEN** a user visits `/poem/:id` for an active poem
- **THEN** the image, poem content, voice name, mood label, share button, download button, and "create another" link are rendered

#### Scenario: Expired poem displayed
- **WHEN** a user visits `/poem/:id` for a soft-deleted poem
- **THEN** an expiration message is shown with a CTA to create a new poem

### Requirement: Login page as Vue SFC
The `inertia/pages/Auth/Login.vue` component SHALL render a login form with email and password fields using Nuxt UI form components. It SHALL use Inertia's `useForm()` for submission.

#### Scenario: User logs in
- **WHEN** a user submits valid credentials
- **THEN** Inertia POSTs to `/login` and redirects on success

### Requirement: Signup page as Vue SFC
The `inertia/pages/Auth/Signup.vue` component SHALL render a signup form with name, email, and password fields using Nuxt UI form components. It SHALL use Inertia's `useForm()` for submission.

#### Scenario: User signs up
- **WHEN** a user submits valid signup data
- **THEN** Inertia POSTs to `/signup` and redirects on success

### Requirement: Admin moods pages as Vue SFCs
The admin moods section SHALL have `inertia/pages/Admin/Moods/Index.vue` (list with create/edit/delete actions) and `inertia/pages/Admin/Moods/Form.vue` (create/edit form). They SHALL use Nuxt UI table and form components.

#### Scenario: Admin views moods list
- **WHEN** an authenticated user visits `/admin/moods`
- **THEN** a table of moods with slug and action buttons (edit, delete) is displayed

#### Scenario: Admin creates a mood
- **WHEN** an admin submits the mood creation form
- **THEN** Inertia POSTs to `/admin/moods` and redirects to the moods index on success

### Requirement: Admin voices pages as Vue SFCs
The admin voices section SHALL have `inertia/pages/Admin/Voices/Index.vue` (list) and `inertia/pages/Admin/Voices/Form.vue` (create/edit). They SHALL display voice name, mood, language, active status, and prompt hint.

#### Scenario: Admin views voices list
- **WHEN** an authenticated user visits `/admin/voices`
- **THEN** a table of voices with name, mood, language, active status, and action buttons is displayed

#### Scenario: Admin edits a voice
- **WHEN** an admin edits a voice's prompt hint and submits
- **THEN** Inertia PUTs to `/admin/voices/:id` and redirects to the voices index on success

### Requirement: Admin poems page as Vue SFC
The `inertia/pages/Admin/Poems/Index.vue` component SHALL display a read-only table of poems with content preview, status (active/expired), and voice name.

#### Scenario: Admin views poems list
- **WHEN** an authenticated user visits `/admin/poems`
- **THEN** a table of poems with content, status, and voice is displayed

### Requirement: Error pages as Vue SFCs
The system SHALL provide `inertia/pages/Errors/NotFound.vue` (404) and `inertia/pages/Errors/ServerError.vue` (500) components with translated error messages and a link back to home.

#### Scenario: 404 page displayed
- **WHEN** a user visits a non-existent route
- **THEN** the NotFound component renders with a translated "Page not found" message

#### Scenario: 500 page displayed
- **WHEN** an unhandled server error occurs
- **THEN** the ServerError component renders with a translated error message
