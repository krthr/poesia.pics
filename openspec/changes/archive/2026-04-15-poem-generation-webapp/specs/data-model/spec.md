## ADDED Requirements

### Requirement: Languages table
The system SHALL have a `languages` table with columns: `id` (primary key), `name` (string), and `code` (string, unique). The system SHALL seed two languages: `es` (Español) and `en` (English).

#### Scenario: Languages exist after migration and seed
- **WHEN** migrations and seeders have run
- **THEN** the `languages` table contains rows for `es` and `en`

### Requirement: Moods table
The system SHALL have a `moods` table with columns: `id` (primary key), `slug` (string, unique), `created_at` (timestamp), and `updated_at` (timestamp). The slug SHALL be a kebab-case identifier (e.g., `melancholic`, `romantic`, `erotic`). Display names and descriptions SHALL NOT be stored in the database — they SHALL be resolved via i18n keys `moods.{slug}` and `moods.{slug}.description`.

#### Scenario: Mood created with slug only
- **WHEN** a mood is created with slug `melancholic`
- **THEN** the mood is stored with only the slug and timestamps
- **THEN** display text is resolved from i18n files at render time

### Requirement: Voices table
The system SHALL have a `voices` table with columns: `id` (primary key), `name` (string), `language_id` (foreign key to languages), `mood_id` (foreign key to moods), `prompt_hint` (text), `active` (boolean, default true), `created_at` (timestamp), and `updated_at` (timestamp). A voice SHALL belong to exactly one language and one mood.

#### Scenario: Voice belongs to one mood and language
- **WHEN** a voice is created with `language_id` pointing to `es` and `mood_id` pointing to `melancholic`
- **THEN** the voice appears only when filtering for Spanish + melancholic

#### Scenario: Inactive voice excluded from public queries
- **WHEN** a voice has `active = false`
- **THEN** it SHALL NOT appear in the public generation form
- **THEN** it SHALL still appear in the admin panel

### Requirement: Poems table
The system SHALL have a `poems` table with columns: `id` (primary key), `voice_id` (foreign key to voices), `image_path` (string), `image_desc` (text, nullable), `content` (text), `created_at` (timestamp), and `deleted_at` (timestamp, nullable). A null `deleted_at` indicates an active poem. A non-null `deleted_at` indicates a soft-deleted poem.

#### Scenario: Poem created with all fields
- **WHEN** a poem is generated successfully
- **THEN** a row is inserted with `voice_id`, `image_path`, `content`, and `created_at`
- **THEN** `deleted_at` SHALL be null
- **THEN** `image_desc` MAY be null

### Requirement: Lucid models with relationships
The system SHALL define Lucid models for Language, Mood, Voice, and Poem with the following relationships:
- Language hasMany Voices
- Mood hasMany Voices
- Voice belongsTo Language, belongsTo Mood, hasMany Poems
- Poem belongsTo Voice

#### Scenario: Eager loading voice with mood and language
- **WHEN** a poem is loaded with `preload('voice', (q) => q.preload('mood').preload('language'))`
- **THEN** the poem's voice, mood, and language data are all available
