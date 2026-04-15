## ADDED Requirements

### Requirement: i18n package setup
The system SHALL use `@adonisjs/i18n` with translation files at `resources/lang/es/messages.json` and `resources/lang/en/messages.json`. The default locale SHALL be `es`. The supported locales SHALL be `es` and `en`.

#### Scenario: Translation files exist for both locales
- **WHEN** the application starts
- **THEN** translation files for `es` and `en` are loaded from `resources/lang/`

### Requirement: Automatic locale detection
The system SHALL detect the user's preferred language from the `Accept-Language` HTTP header on first visit and store it in the session.

#### Scenario: Spanish browser visits for the first time
- **WHEN** a user with `Accept-Language: es` visits for the first time
- **THEN** the session locale is set to `es`
- **THEN** all UI text renders in Spanish

#### Scenario: English browser visits for the first time
- **WHEN** a user with `Accept-Language: en` visits for the first time
- **THEN** the session locale is set to `en`

#### Scenario: Unsupported language falls back to default
- **WHEN** a user with `Accept-Language: fr` visits for the first time
- **THEN** the session locale is set to `es` (default)

### Requirement: Language toggle
The system SHALL display a visual language toggle (ES | EN) in the page header. Clicking a language option SHALL update the session locale and reload the page.

#### Scenario: User switches from ES to EN
- **WHEN** a user clicks "EN" in the language toggle
- **THEN** the session locale changes to `en`
- **THEN** the page reloads with English UI text
- **THEN** any voice selectors filter for English voices

### Requirement: Mood labels via i18n
Mood display names and descriptions SHALL be stored as i18n keys following the pattern `moods.{slug}` and `moods.{slug}.description`. Edge templates SHALL use the `t()` helper to resolve them.

#### Scenario: Mood rendered in current locale
- **WHEN** a mood with slug `melancholic` is rendered with session locale `es`
- **THEN** it displays "Melancólico" from `resources/lang/es/messages.json`

### Requirement: All static UI text translated
All user-facing text (buttons, labels, headings, error messages, expiration message) SHALL be defined in i18n files and rendered via the `t()` helper. No user-facing strings SHALL be hardcoded in Edge templates.

#### Scenario: Expiration message in English
- **WHEN** an expired poem is viewed with session locale `en`
- **THEN** the expiration message displays in English
