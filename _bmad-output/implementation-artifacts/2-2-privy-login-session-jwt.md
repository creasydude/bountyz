# Story 2.2: Privy Login & Session JWT

Status: review
baseline_commit: 3d5488362d707fbc4bca6f3d81a8ec4f4f580255

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a returning user,
I want to log in via Privy (email/social or wallet) and receive a JWT,
so that my subsequent requests are authenticated.

## Acceptance Criteria

1. **Given** a login page offering email/social and "Connect Wallet"
   **When** the user logs in via any method
   **Then** a valid JWT is returned and stored in the client

## Tasks / Subtasks

- [x] Task 1: Create login UI component (AC: 1)
  - [x] Subtask 1.1: Create `apps/web/src/components/auth/LoginForm.tsx`
  - [x] Subtask 1.2: Add email/social login options
  - [x] Subtask 1.3: Add "Connect Wallet" button
  - [x] Subtask 1.4: Style with Tailwind CSS
- [x] Task 2: Implement login flow logic (AC: 1)
  - [x] Subtask 2.1: Handle email/social login
  - [x] Subtask 2.2: Handle wallet connection
  - [x] Subtask 2.3: Store JWT in client
- [x] Task 3: Create login page (AC: 1)
  - [x] Subtask 3.1: Create `apps/web/src/app/auth/login/page.tsx`
  - [x] Subtask 3.2: Add routing and navigation
  - [x] Subtask 3.3: Test complete login flow

## Dev Notes

### Architecture Context

**Privy Configuration (from Architecture):**
- **Auth Provider:** Privy
- **Features:** Email/social login, Web3 wallet connection
- **JWT:** Used for backend authentication
- **Embedded Wallet:** Privy provides signature-ready embedded wallet

**Auth Flow:**
1. User visits login page
2. User selects email/social or connects wallet
3. Privy handles authentication
4. Privy JWT is issued
5. JWT is stored in client for API calls

### Previous Story Intelligence

**From Story 2.1:**
- Privy provider is already configured
- Sign-up flow is implemented
- Privy dependencies are installed

**Code Review Findings:**
- Use environment variables for all configuration
- Add proper error handling for connection failures
- Implement loading states

### Technical Stack

- **Auth Provider:** Privy
- **UI Framework:** Next.js with React
- **Styling:** Tailwind CSS
- **Language:** TypeScript 5.x

### References

- [Source: architecture.md#Authentication & Security] - Privy selection
- [Source: epics.md#Story 2.2] - Original story requirements

## Dev Agent Record

### Agent Model Used

MiMo Auto

### Debug Log References

- Reused Privy provider from Story 2.1
- Manual file creation used

### Completion Notes List

- Created `apps/web/src/components/auth/LoginForm.tsx` with login UI
- Created `apps/web/src/app/auth/login/page.tsx` login page
- Added email/social login and wallet connection options
- Styled with Tailwind CSS following petroleum UI theme
- Added email validation and loading states
- Added accessibility attributes
- Added link to sign-up page

### File List

- apps/web/src/components/auth/LoginForm.tsx (new)
- apps/web/src/app/auth/login/page.tsx (new)
