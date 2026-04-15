## MODIFIED Requirements

### Requirement: Generate page displays form with image upload, mood, and voice selection
The generate page SHALL be rendered by `inertia/pages/Generate.vue` instead of `pages/generate.edge`. The controller SHALL use `inertia.render('Generate', { moods, voicesByMood })` instead of `view.render()`. The form SHALL use Inertia's `useForm()` for submission with file upload support. Alpine.js `x-data="generateForm()"` is replaced by Vue reactive state. Validation errors SHALL be displayed inline via `form.errors` instead of flash messages.

#### Scenario: User visits generate page
- **WHEN** a user navigates to `/generate`
- **THEN** the Generate.vue component renders with image upload input, mood toggle buttons, and voice dropdown, all received as Inertia props

#### Scenario: User selects a mood
- **WHEN** a user clicks a mood button in the Vue component
- **THEN** Vue reactive state updates `selectedMood`, the voice dropdown filters to voices for that mood, and any previously selected voice resets

### Requirement: Form submission generates a poem via Gemini
The form submission SHALL use `form.post('/generate')` via Inertia instead of a native HTML form POST. On success, Inertia redirects to the poem page. On validation errors, the form stays on the page with inline errors. On server errors, a flash error is displayed via Inertia shared data. CSRF is handled automatically via XSRF cookie.

#### Scenario: Successful poem generation
- **WHEN** a user submits a valid image, mood, and voice
- **THEN** Inertia POSTs multipart form data to `/generate`, the server generates the poem, and Inertia redirects to `/poem/:id`

#### Scenario: Invalid file type
- **WHEN** a user submits a non-image file
- **THEN** `form.errors.image` contains the validation error and it displays below the file input

#### Scenario: Gemini API error
- **WHEN** the Gemini API returns an error
- **THEN** the server flashes an error message, Inertia redirects back, and the flash error appears via shared data
