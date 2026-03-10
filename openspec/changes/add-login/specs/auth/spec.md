## ADDED Requirements

### Requirement: Login form with validation

The system SHALL provide a login page with email and password fields. The form SHALL validate email format and require non-empty password before submission.

#### Scenario: Valid submission
- **WHEN** user enters valid email format and non-empty password and submits
- **THEN** the system SHALL treat the user as logged in and redirect or update UI accordingly

#### Scenario: Invalid email
- **WHEN** user enters invalid email format and submits
- **THEN** the system SHALL show an error message and not proceed

#### Scenario: Empty password
- **WHEN** user leaves password empty and submits
- **THEN** the system SHALL show an error message and not proceed

### Requirement: Login state persistence

The system SHALL persist login state in localStorage so that the user remains logged in across page reloads.

#### Scenario: State persists after reload
- **WHEN** user has logged in and reloads the page
- **THEN** the system SHALL treat the user as still logged in

### Requirement: Logout

The system SHALL provide a way to log out. After logout, the stored login state SHALL be cleared.

#### Scenario: User logs out
- **WHEN** user clicks logout
- **THEN** the system SHALL clear login state and show the user as logged out

### Requirement: Login entry on homepage

The system SHALL show a "登录" link on the homepage when the user is not logged in. When logged in, it SHALL show the username and a logout option.

#### Scenario: Not logged in
- **WHEN** user visits the homepage and is not logged in
- **THEN** a "登录" link SHALL be visible

#### Scenario: Logged in
- **WHEN** user visits the homepage and is logged in
- **THEN** the username and logout option SHALL be visible
