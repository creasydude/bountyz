# Story 2.3: User Profile CRUD

Status: review
baseline_commit: 3d5488362d707fbc4bca6f3d81a8ec4f4f580255

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an authenticated user,
I want to view, edit, and delete my profile information,
so that I can keep my data up to date.

## Acceptance Criteria

1. **Given** a valid JWT
   **When** I request my profile data
   **Then** the API returns current profile fields (username, avatar, preferences)
2. **Given** a valid JWT
   **When** I submit updates
   **Then** the profile is updated and the response reflects changes
3. **Given** a valid JWT
   **When** I request deletion
   **Then** the account is removed and a confirmation is returned

## Tasks / Subtasks

- [x] Task 1: Create profile API endpoints (AC: 1, 2, 3)
  - [x] Subtask 1.1: Create `apps/worker/src/routes/profile.ts` with GET, PUT, DELETE endpoints
  - [x] Subtask 1.2: Add JWT validation middleware
  - [x] Subtask 1.3: Implement profile CRUD operations
- [x] Task 2: Create profile UI component (AC: 1, 2)
  - [x] Subtask 2.1: Create `apps/web/src/components/profile/ProfileForm.tsx`
  - [x] Subtask 2.2: Add profile fields (username, avatar, preferences)
  - [x] Subtask 2.3: Style with Tailwind CSS
- [x] Task 3: Create profile page (AC: 1, 2, 3)
  - [x] Subtask 3.1: Create `apps/web/src/app/profile/page.tsx`
  - [x] Subtask 3.2: Add routing and navigation
  - [x] Subtask 3.3: Test complete profile flow

## Dev Notes

### Architecture Context

**Profile API (from Architecture):**
- **Endpoints:** GET /api/profile, PUT /api/profile, DELETE /api/profile
- **Auth:** JWT validation middleware
- **Database:** users table in PostgreSQL

**Profile Fields:**
- username (string, nullable)
- avatar_url (text, nullable)
- preferences (JSON, nullable)

### Previous Story Intelligence

**From Story 2.1 & 2.2:**
- Privy provider is configured
- Sign-up and login flows are implemented
- JWT authentication is working

**Code Review Findings:**
- Use environment variables for all configuration
- Add proper error handling
- Implement loading states

### Technical Stack

- **API:** Express.js
- **Database:** PostgreSQL with Drizzle ORM
- **Auth:** Privy JWT validation
- **UI:** Next.js with React, Tailwind CSS

### References

- [Source: architecture.md#Data Architecture] - Database schema
- [Source: epics.md#Story 2.3] - Original story requirements

## Dev Agent Record

### Agent Model Used

MiMo Auto

### Debug Log References

- Reused database schema from Story 1.2
- Manual file creation used

### Completion Notes List

- Created `apps/worker/src/routes/profile.ts` with GET, PUT, DELETE endpoints
- Created `apps/web/src/components/profile/ProfileForm.tsx` with profile UI
- Created `apps/web/src/app/profile/page.tsx` profile page
- Added JWT validation middleware
- Implemented profile CRUD operations
- Styled with Tailwind CSS following petroleum UI theme
- Added loading states and error handling
- **Code Review Fixes Applied:**
  - Implemented proper JWT validation with Privy
  - Registered profile routes in worker's Express app
  - Added JSON middleware for request parsing

### File List

- apps/worker/src/routes/profile.ts (new: implemented proper JWT validation)
- apps/worker/src/index.ts (modified: registered profile routes, added JSON middleware)
- apps/web/src/components/profile/ProfileForm.tsx (new)
- apps/web/src/app/profile/page.tsx (new)
