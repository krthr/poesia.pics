## ADDED Requirements

### Requirement: Poem page displays poem with image
The system SHALL serve a page at `GET /poem/:id` that displays the poem's content, the original uploaded image, the voice name, and the mood name (i18n-resolved). The page SHALL use typography consistent with the site's minimalist aesthetic.

#### Scenario: Active poem viewed
- **WHEN** a user visits `/poem/:id` for a poem where `deleted_at IS NULL`
- **THEN** the page displays the image, poem content, voice name, and mood label

#### Scenario: Non-existent poem
- **WHEN** a user visits `/poem/:id` for an ID that does not exist
- **THEN** the system returns a 404 page

### Requirement: Expired poem shows expiration message
The system SHALL display a poetic expiration message when a soft-deleted poem is accessed. The message SHALL be i18n-translated and include a call-to-action to create a new poem.

#### Scenario: Expired poem viewed
- **WHEN** a user visits `/poem/:id` for a poem where `deleted_at IS NOT NULL`
- **THEN** the page displays an expiration message instead of the poem content
- **THEN** the page includes a link to `/generate`

### Requirement: Share link
The poem page SHALL include a "copy link" button that copies the poem's URL (`/poem/:id`) to the clipboard.

#### Scenario: User copies share link
- **WHEN** a user clicks the share/copy link button on an active poem
- **THEN** the URL `/poem/:id` is copied to the clipboard

### Requirement: Shareable PNG image generation
The system SHALL serve a PNG image at `GET /poem/:id/image` generated using satori and @resvg/resvg-js. The image SHALL contain the original photo, the poem text, the voice attribution, and "poesia.pics" branding. The image SHALL use the site's fonts.

#### Scenario: Image generated for active poem
- **WHEN** a user requests `/poem/:id/image` for an active poem
- **THEN** the system returns a PNG image with Content-Type `image/png`
- **THEN** the image contains the photo, poem text, voice name, and branding

#### Scenario: Image requested for expired poem
- **WHEN** a user requests `/poem/:id/image` for a soft-deleted poem
- **THEN** the system returns a 404 response

### Requirement: Download image button
The poem page SHALL include a button to download the generated PNG image.

#### Scenario: User downloads shareable image
- **WHEN** a user clicks the "generate image" / download button on an active poem
- **THEN** the browser downloads the PNG from `/poem/:id/image`
