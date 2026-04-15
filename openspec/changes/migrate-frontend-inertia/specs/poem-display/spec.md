## MODIFIED Requirements

### Requirement: Poem page displays poem with image
The poem page SHALL be rendered by `inertia/pages/Poem.vue` instead of `pages/poem.edge`. The controller SHALL use `inertia.render('Poem', { poem })` with the poem serialized including nested `voice` and `voice.mood` relationships. Alpine.js `x-data` for the copy button is replaced by Vue reactive state.

#### Scenario: Active poem viewed
- **WHEN** a user visits `/poem/:id` for an active poem
- **THEN** the Poem.vue component renders with the poem image, content, voice attribution, mood label (translated via `t()`), share button, download button, and "create another" link

#### Scenario: Non-existent poem
- **WHEN** a user visits `/poem/:id` for a non-existent poem
- **THEN** a 404 response is returned

### Requirement: Expired poem shows expiration message
The Poem.vue component SHALL check `poem.deletedAt` and render an expiration message section with translated text and a CTA to create a new poem, instead of the normal poem display.

#### Scenario: Expired poem viewed
- **WHEN** a user visits `/poem/:id` for a soft-deleted poem
- **THEN** the Poem.vue component renders the expiration message using `t('poem.expired_title')` and `t('poem.expired_message')` with a CTA link to `/generate`

### Requirement: Share link
The share button SHALL use Vue reactive state (`ref`) instead of Alpine.js `x-data` to manage the "copied" state with a 2-second auto-reset.

#### Scenario: User copies share link
- **WHEN** user clicks the share button
- **THEN** the current URL is copied to clipboard, the button text changes to the "copied" translation, and reverts after 2 seconds
