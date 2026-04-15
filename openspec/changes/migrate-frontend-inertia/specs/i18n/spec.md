## MODIFIED Requirements

### Requirement: All static UI text translated
All static UI text SHALL be translated using the `useI18n()` composable in Vue components instead of the `i18n.t()` Edge helper. Translation files (`resources/lang/es/messages.json`, `resources/lang/en/messages.json`) remain unchanged. The server SHALL share the full message bag for the current locale via Inertia shared data.

#### Scenario: Expiration message in English
- **WHEN** an English-locale user views an expired poem
- **THEN** the Vue component displays "This poem has expired" using `t('poem.expired_title')` from Inertia shared props

### Requirement: Language toggle
The language toggle SHALL trigger an Inertia visit to `/lang/:code` instead of a full page reload. The server updates the session locale, and the Inertia response includes updated `locale` and `messages` in shared data.

#### Scenario: User switches from ES to EN
- **WHEN** user clicks the EN language toggle
- **THEN** an Inertia visit to `/lang/en` occurs, the locale updates reactively, and all `t()` calls return English translations without a full page reload

### Requirement: Mood labels via i18n
Mood labels SHALL be translated in Vue components using `t('moods.' + mood.slug)` from the i18n composable.

#### Scenario: Mood rendered in current locale
- **WHEN** the generate page renders moods for a Spanish-locale user
- **THEN** mood buttons show "Melancólico", "Romántico", "Erótico" via `t()` calls
