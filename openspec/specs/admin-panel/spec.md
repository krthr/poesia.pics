## ADDED Requirements

### Requirement: Admin routes protected by auth
All admin routes SHALL be grouped under `/admin` and protected by the existing auth middleware. Only authenticated users SHALL access admin pages.

#### Scenario: Unauthenticated user visits admin
- **WHEN** an unauthenticated user visits `/admin/voices`
- **THEN** they are redirected to the login page

#### Scenario: Authenticated user visits admin
- **WHEN** an authenticated user visits `/admin/voices`
- **THEN** the admin page renders successfully

### Requirement: Mood CRUD
The system SHALL provide admin pages for listing, creating, editing, and deleting moods at `/admin/moods`. Creating a mood requires a unique slug. Editing allows changing the slug. Deleting a mood SHALL fail if it has associated voices.

#### Scenario: Admin creates a mood
- **WHEN** an admin submits a new mood with slug `nostalgic`
- **THEN** the mood is created and the admin is redirected to the moods list

#### Scenario: Admin deletes mood with voices
- **WHEN** an admin attempts to delete a mood that has associated voices
- **THEN** the system displays an error and does not delete the mood

### Requirement: Voice CRUD with prompt_hint editing
The system SHALL provide admin pages for listing, creating, editing, and deleting voices at `/admin/voices`. The form SHALL include fields for: name, language (select), mood (select), prompt_hint (textarea), and active (checkbox). The prompt_hint field is the primary creative tool for shaping poem output.

#### Scenario: Admin creates a voice
- **WHEN** an admin fills in name "Pablo Neruda", selects language "es", mood "melancholic", enters a prompt_hint, and submits
- **THEN** the voice is created with all fields and the admin is redirected to the voices list

#### Scenario: Admin edits prompt_hint
- **WHEN** an admin edits a voice's prompt_hint and saves
- **THEN** the prompt_hint is updated in the database
- **THEN** subsequent poem generations using this voice use the new prompt_hint

#### Scenario: Admin toggles voice active status
- **WHEN** an admin unchecks the active checkbox and saves
- **THEN** the voice no longer appears in the public generation form

### Requirement: Poems listing for admin
The system SHALL provide a read-only poem listing page at `/admin/poems` showing: poem content (truncated), voice name, mood, language, created_at, and deleted_at status. The list SHALL be paginated and sortable by creation date.

#### Scenario: Admin views poems list
- **WHEN** an admin visits `/admin/poems`
- **THEN** the page displays a paginated list of all poems (including soft-deleted ones)
- **THEN** soft-deleted poems are visually distinguished (e.g., muted style)
