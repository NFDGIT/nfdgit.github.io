## ADDED Requirements

### Requirement: Theme toggle between light and dark

The system SHALL support two visual themes: light and dark. The active theme SHALL be switchable by the user.

#### Scenario: User switches to dark mode
- **WHEN** user clicks the theme toggle control
- **THEN** the page SHALL switch to dark theme (dark background, light text)

#### Scenario: User switches to light mode
- **WHEN** user clicks the theme toggle control while in dark mode
- **THEN** the page SHALL switch to light theme (light background, dark text)

### Requirement: Theme preference persistence

The system SHALL persist the user's theme choice across page loads and sessions.

#### Scenario: Preference persists after reload
- **WHEN** user selects dark mode and reloads the page
- **THEN** the page SHALL load in dark mode

### Requirement: Respect system preference on first visit

The system SHALL use the operating system's color scheme preference when the user has not yet made an explicit choice.

#### Scenario: First visit with system dark mode
- **WHEN** user visits the site for the first time and the system preference is dark
- **THEN** the page SHALL display in dark mode

#### Scenario: Ff d s
- **WHEN** user visits the site for the first time and the system preference is light
- **THEN** the page SHALL display in light mode

### Requirement: Theme toggle control visibility

The system SHALL provide a visible control (e.g., icon button) to switch themes on pages that support theming.

#### Scenario: Toggle visible on homepage
- **WHEN** user views the homepage
- **THEN** a theme toggle control SHALL be visible (e.g., in header area)
