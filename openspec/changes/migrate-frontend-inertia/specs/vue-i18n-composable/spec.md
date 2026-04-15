## ADDED Requirements

### Requirement: useI18n composable reads translations from Inertia props
The system SHALL provide a `useI18n()` composable at `inertia/composables/useI18n.ts` that reads `locale` and `messages` from `usePage().props`. It SHALL return a reactive `locale` ref and a `t(key, replacements?)` function.

#### Scenario: Translate a simple key
- **WHEN** a Vue component calls `t('landing.headline')`
- **THEN** it returns the translated string for the current locale (e.g., "Tu imagen, un poema" for `es`)

#### Scenario: Translate with placeholder replacement
- **WHEN** a Vue component calls `t('poem.voice_by', { name: 'Neruda' })`
- **THEN** it returns "Voz: Neruda" for the `es` locale

#### Scenario: Missing key returns the key itself
- **WHEN** a Vue component calls `t('nonexistent.key')`
- **THEN** it returns the string `"nonexistent.key"` as a fallback

### Requirement: Locale is reactive
The `locale` value returned by `useI18n()` SHALL be a Vue computed ref that updates when Inertia props change (e.g., after a locale switch navigation).

#### Scenario: Locale updates after language switch
- **WHEN** the user navigates to `/lang/en` via an Inertia visit
- **THEN** the `locale` ref updates to `"en"` and all `t()` calls return English translations
