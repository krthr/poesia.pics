## ADDED Requirements

### Requirement: Rate limiter package with database backend
The system SHALL use `@adonisjs/limiter` configured with the `database` backend (SQLite).

#### Scenario: Rate limiter configured on application start
- **WHEN** the application starts
- **THEN** the rate limiter is available using the database store

### Requirement: Generation endpoint rate limit
The `POST /generate` endpoint SHALL be rate-limited to 5 requests per 10 minutes per IP address.

#### Scenario: User within rate limit
- **WHEN** a user has made fewer than 5 generation requests in the last 10 minutes
- **THEN** the request proceeds normally

#### Scenario: User exceeds rate limit
- **WHEN** a user has made 5 generation requests in the last 10 minutes and submits another
- **THEN** the system responds with HTTP 429
- **THEN** the response includes a `Retry-After` header

### Requirement: Image endpoint rate limit
The `GET /poem/:id/image` endpoint SHALL be rate-limited to 10 requests per hour per IP address.

#### Scenario: Image request within limit
- **WHEN** a user has made fewer than 10 image requests in the last hour
- **THEN** the image is generated and returned

#### Scenario: Image request exceeds limit
- **WHEN** a user has made 10 image requests in the last hour and requests another
- **THEN** the system responds with HTTP 429
