## ADDED Requirements

### Requirement: Queue package with database backend
The system SHALL use `@adonisjs/queue` configured with the `database` backend (SQLite). The queue infrastructure SHALL be set up with the required migrations.

#### Scenario: Queue configured on application start
- **WHEN** the application starts
- **THEN** the queue system is available using the database store

### Requirement: Scheduled cleanup job
The system SHALL define a scheduled job `CleanupExpiredPoems` that runs every hour. The job SHALL find all poems where `created_at` is older than 24 hours AND `deleted_at IS NULL`, and set `deleted_at` to the current timestamp.

#### Scenario: Poems older than 24h are soft-deleted
- **WHEN** the cleanup job runs
- **THEN** all poems with `created_at` older than 24 hours and `deleted_at IS NULL` have their `deleted_at` set to the current timestamp

#### Scenario: Already soft-deleted poems are not modified
- **WHEN** the cleanup job runs
- **THEN** poems where `deleted_at IS NOT NULL` are not modified

#### Scenario: Poems younger than 24h are untouched
- **WHEN** the cleanup job runs
- **THEN** poems with `created_at` within the last 24 hours remain unchanged

### Requirement: Images not deleted
The cleanup job SHALL NOT delete image files from disk. Only the `deleted_at` column is updated.

#### Scenario: Image file persists after soft delete
- **WHEN** a poem is soft-deleted by the cleanup job
- **THEN** the file at `poem.image_path` still exists on disk
