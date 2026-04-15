## ADDED Requirements

### Requirement: Generate page displays form with image upload, mood, and voice selection
The system SHALL serve a page at `GET /generate` with a form containing: an image file input (accepts jpg, png, webp; max 5MB), a mood selector, and a voice selector. The mood selector SHALL display all moods with i18n-resolved names for the current locale. The voice selector SHALL filter voices by the selected mood AND the current session language, showing only active voices.

#### Scenario: User visits generate page
- **WHEN** a user visits `/generate` with session language `es`
- **THEN** the page displays an upload field, mood options with Spanish labels, and an empty voice selector

#### Scenario: User selects a mood
- **WHEN** the user selects mood `melancholic` with session language `es`
- **THEN** the voice selector populates with active voices where `mood.slug = 'melancholic'` and `language.code = 'es'`

### Requirement: Form submission generates a poem via Gemini
The system SHALL handle `POST /generate` by: validating the uploaded image (type, size) and voice_id, saving the image to `storage/uploads/poems/{uuid}.{ext}`, loading the voice with its mood and language, constructing a system prompt from `voice.name`, `voice.prompt_hint`, `mood.slug`, and `language.code`, sending the image (base64) and prompt to Gemini `gemini-2.5-flash`, saving the resulting poem to the database, and redirecting to `GET /poem/:id`.

#### Scenario: Successful poem generation
- **WHEN** a user submits a valid image and voice_id
- **THEN** the image is saved to disk
- **THEN** Gemini receives the image and a prompt incorporating the voice's prompt_hint, mood, and language
- **THEN** a Poem record is created with the generated content
- **THEN** the user is redirected to `/poem/:id`

#### Scenario: Invalid file type
- **WHEN** a user submits a file that is not jpg, png, or webp
- **THEN** the system returns a validation error and re-renders the form

#### Scenario: File too large
- **WHEN** a user submits an image larger than 5MB
- **THEN** the system returns a validation error and re-renders the form

#### Scenario: Gemini API error
- **WHEN** the Gemini API returns an error or refuses to generate content
- **THEN** the system displays a user-friendly error message on the generate page
- **THEN** the uploaded image is cleaned up from disk

### Requirement: System prompt construction
The system SHALL construct the Gemini prompt dynamically using the voice and mood data. The prompt SHALL instruct the model to write a poem in the specified language, in the style described by `voice.prompt_hint`, with the emotional tone of the mood, inspired by the attached image.

#### Scenario: Prompt for Spanish melancholic Neruda voice
- **WHEN** voice is "Pablo Neruda" with prompt_hint "Usa metáforas telúricas, del océano y la tierra", mood is `melancholic`, language is `es`
- **THEN** the prompt instructs Gemini to write a melancholic poem in Spanish inspired by the image, in the style described by the prompt_hint
