## ADDED Requirements

### Requirement: Tailwind CSS integration
The system SHALL use Tailwind CSS integrated via `@tailwindcss/vite`. Tailwind SHALL be configured in `resources/css/app.css` using the `@import "tailwindcss"` directive.

#### Scenario: Tailwind classes render correctly
- **WHEN** an Edge template uses Tailwind utility classes
- **THEN** the styles are applied correctly in the browser via Vite

### Requirement: Classic typography
The system SHALL use classic serif fonts (e.g., Playfair Display for headings, Lora for body/poem text) loaded as web fonts. The font stack SHALL be configured in Tailwind's theme.

#### Scenario: Fonts loaded on page
- **WHEN** a user visits any page
- **THEN** the custom serif fonts are applied to headings and body text

### Requirement: Minimalist aesthetic
The site design SHALL follow a minimalist aesthetic with ample whitespace, muted color palette, and focus on typography. The layout SHALL be responsive and readable on mobile devices.

#### Scenario: Mobile responsive layout
- **WHEN** a user visits on a mobile device
- **THEN** the layout adapts to the screen width with readable text and usable form controls

### Requirement: Landing page
The system SHALL serve a landing page at `GET /` with a brief description of poesia.pics and a call-to-action linking to `/generate`. The page SHALL reflect the site's minimalist, poetic aesthetic.

#### Scenario: User visits landing page
- **WHEN** a user visits `/`
- **THEN** the page displays a description and a CTA to generate a poem
