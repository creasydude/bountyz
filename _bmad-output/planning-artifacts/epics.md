---
stepsCompleted: [1, 2]
inputDocuments:
  - /home/creasy/bountyz/_bmad-output/planning-artifacts/prds/prd-bountyz-2026-06-14/prd.md
  - /home/creasy/bountyz/_bmad-output/planning-artifacts/architecture.md
  - /home/creasy/bountyz/_bmad-output/planning-artifacts/ux-designs/ux-bountyz-2026-06-14/DESIGN.md
  - /home/creasy/bountyz/_bmad-output/planning-artifacts/ux-designs/ux-bountyz-2026-06-14/EXPERIENCE.md
workflowType: 'epics-and-stories'
project_name: 'bountyz'
user_name: 'Creasy'
date: '2026-06-19'
lastStep: 2
status: 'in_progress'
completedAt: '2026-06-19'
epicsApproved: true
---

# bountyz - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for bountyz, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Relayer Reservoir (Web3 Backend):**

- FR.1.1: Gasless Meta-Transactions - Support for EIP-712 signatures submitted via a backend relayer to the smart contract
- FR.1.2: Privy Auth Integration - Validation of Privy JWTs for user identity and session management
- FR.1.3: Smart Account Abstraction - Automatic deployment/management of ERC-4337 smart accounts for social/email users
- FR.1.4: Gas Tank Monitoring - A backend dashboard or alert system for the "Reservoir" to ensure liquidity for relaying

**Effervescent State Machine (Core Logic):**

- FR.2.1: 10m "Doer" Challenge - When a bounty is accepted, the Doer has 10 minutes to submit an initial proof or sign-of-life
- FR.2.2: 6h Failure Cooldown - If the 10m window is missed, the bounty reverts to OPEN and the Doer is barred from accepting any bounty for 6 hours
- FR.2.3: 48h Auto-Approval - Submitted proof enters a 48h review window. If the Creator does not dispute or approve, it auto-approves
- FR.2.4: 96h Safety Lock - Post-submission, funds are locked for 96 hours before they can be withdrawn or cancelled, allowing for dispute resolution
- FR.2.5: BullMQ Orchestration - All timers (10m, 6h, 48h, 96h) must be managed by BullMQ for reliability and persistence

**Petroleum UI (The "Absorbent" Experience):**

- FR.3.1: Iridescent "Oil Slick" Background - A shifting, dark background with oil-like iridescence that reacts to cursor movement
- FR.3.2: Viscous Tension Interactions - Buttons and cards that bulge or deform towards the cursor, simulating physical surface tension
- FR.3.3: Liquid Timer Visuals - The 10m window visualized as liquid slowly draining or sinking into the background
- FR.3.4: Atmospheric Gas States - UI shifts color or viscosity based on current L2 gas prices
- FR.3.5: Bioluminescent Overlays - Actionable items glow from "underneath" the petroleum surface
- FR.3.6: Effervescent Chat Bubbles - Bounty-specific chat messages that rise like bubbles through the oil
- FR.3.7: Lead-Glass Vault (Disputed State) - UI turns matte gray and "frozen" for bounties in dispute or locked funds

### NonFunctional Requirements

**Security & Compliance:**

- NFR.1.1: Relayer Security - Private keys for the Gas Tank must be stored in a hardware security module (HSM) or encrypted environment variables, never logged
- NFR.1.2: Smart Contract Audit - Escrow and Relayer contracts must be verified on-chain

**Reliability & Scalability:**

- NFR.2.1: Timer Persistence - All BullMQ jobs must persist in Redis to survive server restarts
- NFR.2.2: L2 Latency - The system must handle L2 (e.g., Base or Polygon) finality delays gracefully in the UI

**Performance & UX:**

- NFR.3.1: Visual Smoothness - Three.js/Framer Motion effects must maintain 60 FPS on modern browsers
- NFR.3.2: WebSocket Latency - "Effervescent Chat" must have <100ms latency for message delivery within rooms

### Additional Requirements

**Starter Template:**

- Starter Template: **Modular Web3 Monorepo (Turborepo)** - Initialize Turborepo foundation with Next.js for frontend and Node.js for worker service, enabling backend-first strategy with shared types package

**Infrastructure & Deployment:**

- Frontend Hosting: Vercel (Next.js)
- Persistent Backend/Worker: Railway (Node.js + Redis)
- Database: Neon or Railway Postgres with Drizzle ORM v1.0.0-rc.2

**Key Management:**

- Relayer Security: Private keys stored as Encrypted Environment Variables on Railway; backend code performs EIP-712 signatures in a secure, isolated runtime

**Architecture Patterns:**

- Naming Conventions:
  - Database: snake_case (tables and columns)
  - API: kebab-case (endpoints), camelCase (JSON fields)
  - Code: kebab-case.ts (logic), PascalCase.tsx (React components)
  - Variables/Functions: camelCase
- Event System: `domain:action` format (e.g., `bounty:accepted`, `timer:10m_started`)
- API Structure: `{ success: boolean, data?: any, error?: { message: string, code: string } }`
- State Recovery: Automatic BullMQ job retries for transient L2 RPC failures

### UX Design Requirements

- UX-DR1: Implement custom R3F Scene-as-Layout where all DOM elements (via Html component) inherit perspective and distortion
- UX-DR2: Enforce CSS 3D transforms (`transform-style: preserve-3d`) on all Html components to prevent layout thrashing
- UX-DR3: Develop background shader with iridescent 'oil slick' effect reactive to cursor position and network viscosity
- UX-DR4: Implement 'The Dent' interaction: background slick dips inward on click
- UX-DR5: Implement 'The Bulge' interaction: bounty cards expand and ripple background on hover
- UX-DR6: Implement 'The Sink' timer: physical sinking object with 'Near-Death' state (hazard-amber shift and vibration shader when < 60s)
- UX-DR7: Implement 'Viscosity Shift': background shader speed/amplitude mapped to L2 gas prices
- UX-DR8: Implement 'Saturating' whirlpool state: background whirlpool animation around active component during retries
- UX-DR9: Implement 'Low Reservoir' state: amber tint applied to the entire background slick
- UX-DR10: Implement 'Cooldown' stagnant state: zero-velocity static black background
- UX-DR11: Implement 'The Vault' vaulted state: frosted lead-glass overlay (blur + desaturation) with stiff physics
- UX-DR12: Implement 'The Ledger' subsurface transition: scroll-triggered 'dive' where iridescence fades to 5% murky depth
- UX-DR13: Implement 'Viscous Modal' for Privy signatures that frames the popup and ripples the background edges
- UX-DR14: Apply Brutalist Monospace (JetBrains Mono) for all data/labels and Sans (PP Neue Montreal) for headers
- UX-DR15: Ensure bioluminescent sub-surface glows for all focus indicators and actionable items

### FR Coverage Map

**FR Coverage:**
- **FR.1.1 (Gasless Meta-Transactions):** Epic 6 - EIP-712 signature service and relayer
- **FR.1.2 (Privy Auth Integration):** Epic 2 - Authentication and JWT validation
- **FR.1.3 (Smart Account Abstraction):** Epic 6 - ERC-4337 deployment and management
- **FR.1.4 (Gas Tank Monitoring):** Epic 3 - Bounty creation funding and monitoring
- **FR.2.1 (10m Challenge):** Epic 4 - Proof of start timer
- **FR.2.2 (6h Cooldown):** Epic 4 - Failure cooldown logic
- **FR.2.3 (48h Auto-Approval):** Epic 4 - Auto-approval workflow
- **FR.2.4 (96h Safety Lock):** Epic 4 - Dispute resolution lock
- **FR.2.5 (BullMQ Orchestration):** Epic 4 - All timer management
- **FR.3.1 (Iridescent Background):** Epic 5 - Oil slick shader
- **FR.3.2 (Viscous Tension):** Epic 5 - Bulge/deform interactions
- **FR.3.3 (Liquid Timer):** Epic 5 - Sink timer visuals
- **FR.3.4 (Atmospheric Gas):** Epic 5 - Gas price mapping
- **FR.3.5 (Bioluminescent Overlays):** Epic 5 - Glowing effects
- **FR.3.6 (Chat Bubbles):** Epic 5 - Chat UI (part of Petroleum UI)
- **FR.3.7 (Lead-Glass Vault):** Epic 5 - Disputed state overlay

**NFR Coverage:**
- **NFR.1.1 (Relayer Security):** Epic 2 (environment variables), Epic 6 (signature service)
- **NFR.1.2 (Smart Contract Audit):** Epic 6 (on-chain verification)
- **NFR.2.1 (Timer Persistence):** Epic 1 (BullMQ + Redis setup), Epic 4 (job orchestration)
- **NFR.2.2 (L2 Latency):** Epic 1 (architecture), Epic 4 (error handling)
- **NFR.3.1 (Visual Smoothness):** Epic 5 (R3F optimization)
- **NFR.3.2 (WebSocket Latency):** Epic 1 (Socket.io setup), Epic 4 (real-time sync)

**UX Design Requirements Coverage:**
- **UX-DR1 through UX-DR15:** All covered in Epic 5 (Petroleum UI Experience)

## Epic List

### Epic 1: Foundation & Infrastructure Setup

#### Story 1.1: Initialize Turborepo monorepo with Next.js web app and Node.js worker
As ... (the ");

####  

---

t“""""""""""""""
"...

Platform ... 


#### Story 1.1: Initialize Turborepo monorepo with Next.js web app and Node.js worker
As a developer, I want a Turborepo workspace that contains a Next.js frontend and a Node.js backend worker so that the project has a clear, version‑controlled structure for all code.

**Acceptance Criteria:**
- **Given** an empty repository
- **When** I run `npx create-turbo@latest --example basic`
- **Then** a `apps/web` (Next.js) and `apps/worker` (Node.js) directory are created
- **And** a top‑level `package.json` with workspaces points to both apps

#### Story 1.2: Create shared packages for database schema and shared types/constants
As a developer, I want a `packages/database` with Drizzle ORM schemas and a `packages/shared` with common TypeScript types so that both the web and worker can use the same definitions and stay in sync.

**Acceptance Criteria:**
- **Given** the monorepo from Story 1.1
- **When** I add `packages/database` and `packages/shared`
- **Then** `packages/database/src/schema.ts` defines the `bounties` and `users` tables using snake_case
- **And** `packages/shared/src/types.ts` exports interfaces used by both apps

#### Story 1.3: Set up PostgreSQL with Drizzle migrations
As a backend engineer, I want a PostgreSQL 18 instance and Drizzle migration scripts so that the database schema can be versioned and applied automatically.

**Acceptance Criteria:**
- **Given** a Railway (or Neon) Postgres URL
- **When** I run `npm run db:migrate`
- **Then** the `users` and `bounties` tables are created with the correct columns
- **And** the migration files are committed under `packages/database/migrations`

#### Story 1.4: Configure BullMQ with Redis persistence
As a devops engineer, I want BullMQ connected to a Railway Redis instance with persistence enabled so that all timer jobs survive restarts.

**Acceptance Criteria:**
- **Given** a Redis connection string in `.env`
- **When** the worker boots
- **Then** a BullMQ queue named `bounty-timers` is created
- **And** the queue’s `defaultJobOptions` enable `removeOnComplete: false` and `repeat: { jobId: 'persist' }`

#### Story 1.5: Establish Socket.io real‑time layer between web and worker
As a frontend developer, I want a Socket.io server in the worker and a client in the Next.js app so that UI components receive live bounty‑state updates.

**Acceptance Criteria:**
- **Given** the worker running `apps/worker/src/socket-server.ts`
- **When** a bounty state changes (e.g., timer expires)
- **Then** the worker emits a `bounty:update` event via Socket.io
- **And** the Next.js app receives the event and updates the UI in under 100 ms.

Platform architecture established with shared packages, database schema, and core patterns for development.
**FRs covered:** NFR.1.1, NFR.1.2, NFR.2.1, NFR.2.2, NFR.3.1, NFR.3.2, Additional (Starter Template, Infrastructure, Patterns)

### Epic 2: Authentication & User Management
Users can sign up, authenticate via Privy, and manage their profiles.
**FRs covered:** FR.1.2 (Privy Auth Integration), NFR.1.1 (Relayer Security), Additional (Key Management)

#### Story 2.1: Privy Sign‑Up Flow (Web3 wallet optional)
As a user, I want to sign up using Privy with the option to connect a Web3 wallet so that I can create an account using email/social login or a crypto wallet.

**Acceptance Criteria:**
- **Given** the Sign‑Up UI displays both email/social options and a "Connect Wallet" button
- **When** the user selects an email/social method and completes the form
- **Then** a Privy JWT is issued and the account is created
- **When** the user clicks "Connect Wallet" and approves the wallet connection
- **Then** the wallet address is linked to the newly created account and a JWT is issued

#### Story 2.2: Privy Login & Session JWT
As a returning user, I want to log in via Privy (email/social or wallet) and receive a JWT so that my subsequent requests are authenticated.

**Acceptance Criteria:**
- **Given** a login page offering email/social and "Connect Wallet"
- **When** the user logs in via any method
- **Then** a valid JWT is returned and stored in the client

#### Story 2.3: User Profile CRUD
As an authenticated user, I want to view, edit, and delete my profile information so that I can keep my data up to date.

**Acceptance Criteria:**
- **Given** a valid JWT
- **When** I request my profile data
- **Then** the API returns current profile fields (username, avatar, preferences)
- **When** I submit updates
- **Then** the profile is updated and the response reflects changes
- **When** I request deletion
- **Then** the account is removed and a confirmation is returned

#### Story 2.4: Secure Key Management Setup
As a devops engineer, I want to store Relayer private keys in encrypted environment variables so that they are never exposed in code or logs.

**Acceptance Criteria:**
- **Given** a `.env` file with `ENCRYPTED_RELAYER_KEY`
- **When** the worker starts
- **Then** it decrypts the key at runtime and uses it for signing meta‑transactions

#### Story 2.5: Auth Middleware for Protected Routes
As a backend developer, I want middleware that validates Privy JWTs on protected endpoints so that only authenticated users can access sensitive actions.

**Acceptance Criteria:**
- **Given** an incoming request with an Authorization header
- **When** the JWT is valid
- **Then** the request proceeds; otherwise a 401 error is returned

### Epic 3: Bounty Creation & Discovery
Creators can post bounties with funding, and Doers can discover and browse available bounties.
**FRs covered:** FR.1.1 (Gasless Meta-Transactions - partial), FR.1.4 (Gas Tank Monitoring - partial)

#### Story 3.1: Create Bounty Form
As a creator, I want a form to enter bounty title, description, reward amount, and deadline so that I can publish a new bounty.

**Acceptance Criteria:**
- **Given** the creator is authenticated
- **When** they fill out the form and click "Create"
- **Then** a new bounty record is stored and a success message is shown

#### Story 3.2: Bounty Funding via Relayer
As a creator, I want the platform to automatically fund the bounty using the gasless relayer so that I don’t need to handle gas fees.

**Acceptance Criteria:**
- **Given** a newly created bounty
- **When** the system triggers the relayer service
- **Then** the bounty’s escrow is funded and the relayer logs the transaction

#### Story 3.3: Bounty List / Discovery Page
As a doer, I want to browse a list of available bounties with filters (status, reward, category) so that I can find work that matches my interests.

**Acceptance Criteria:**
- **Given** the discovery page loads
- **When** the user applies any filter
- **Then** the list updates to show matching bounties

#### Story 3.4: Bounty Detail View
As a doer, I want to view full details of a bounty (description, reward, deadline, requirements) so that I can decide whether to accept it.

**Acceptance Criteria:**
- **Given** a bounty ID
- **When** the user navigates to `/bounties/:id`
- **Then** the page displays all bounty fields and an "Accept" button

#### Story 3.5: Gas Tank Monitoring Alert
As an ops engineer, I want an alert when the relayer’s gas tank balance drops below a threshold so that we can top‑up before transactions fail.

**Acceptance Criteria:**
- **Given** a Redis/monitoring service
- **When** the gas tank balance < 10 % of capacity
- **Then** an email/Slack alert is sent to the ops channel

### Epic 4: Bounty Lifecycle Management
The core bounty workflow with state machine, timers, and approvals works end‑to‑end.
**FRs covered:** FR.2.1 (10m Challenge), FR.2.2 (6h Cooldown), FR.2.3 (48h Auto‑Approval), FR.2.4 (96h Safety Lock), FR.2.5 (BullMQ Orchestration)

#### Story 4.1: Implement 10m "Doer" Challenge Timer
As a doer, I want a 10‑minute timer to start when I accept a bounty so that I must submit a proof of start before it expires.

**Acceptance Criteria:**
- **Given** a bounty is accepted
- **When** the acceptance occurs
- **Then** a 10‑minute BullMQ job is scheduled
- **When** the timer expires without proof submission
- **Then** the bounty reverts to OPEN and the doer is placed in cooldown

#### Story 4.2: Implement 6h Failure Cooldown
As a system, I need to block a doer from accepting new bounties for 6 hours after missing the 10m challenge.

**Acceptance Criteria:**
- **Given** a doer missed the 10m challenge
- **When** the cooldown starts
- **Then** the doer’s account is marked with a `cooldownUntil` timestamp 6 hours ahead
- **And** the UI prevents bounty acceptance for that user until the time passes

#### Story 4.3: Implement 48h Auto‑Approval Workflow
As a creator, I want a bounty to be auto‑approved after 48 hours if I do not dispute the submitted proof.

**Acceptance Criteria:**
- **Given** a proof is submitted
- **When** 48 hours pass without a dispute
- **Then** the system marks the bounty as APPROVED and releases escrow funds

#### Story 4.4: Implement 96h Safety Lock
As a system, I need to lock bounty funds for 96 hours after approval to allow dispute resolution.

**Acceptance Criteria:**
- **Given** a bounty is auto‑approved
- **When** the approval occurs
- **Then** the escrow remains locked for 96 hours before funds can be withdrawn
- **If** a dispute is raised within that window, the lock is maintained until resolved

#### Story 4.5: BullMQ Orchestration of Bounty State Machine
As a developer, I want all bounty state transitions (challenge, cooldown, auto‑approval, safety lock) managed by BullMQ jobs so that the workflow is reliable and persistent.

**Acceptance Criteria:**
- **Given** the BullMQ queue `bounty-timers`
- **When** any state change event occurs
- **Then** the appropriate job is created/updated in Redis
- **And** retries are configured for transient failures (e.g., L2 RPC delays)

### Epic 5: Petroleum UI Experience
Users experience the visceral, "absorbent" bounty platform with oil slick backgrounds, viscous interactions, and liquid timers.
**FRs covered:** FR.3.1 (Iridescent Background), FR.3.2 (Viscous Tension), FR.3.3 (Liquid Timer), FR.3.4 (Atmospheric Gas), FR.3.5 (Bioluminescent Overlays), FR.3.6 (Chat Bubbles), FR.3.7 (Lead-Glass Vault), UX-DR1 through UX-DR15

#### Story 5.1: Implement R3F Scene‑as‑Layout with 3D Perspective
As a UI developer, I want a custom R3F scene that serves as the layout container so that all DOM elements inherit a unified 3D perspective.

**Acceptance Criteria:**
- **Given** a new `SceneLayout.tsx` component
- **When** it wraps the app
- **Then** all child Html components share the same `camera` perspective and `transform‑style: preserve‑3d`

#### Story 5.2: Develop Iridescent Oil‑Slick Background Shader
As a visual designer, I need a shader that renders an oil‑slick effect responsive to cursor movement so that the background feels alive.

**Acceptance Criteria:**
- **Given** a fragment shader file `OilSlick.glsl`
- **When** the cursor moves
- **Then** the shader updates hue/iridescence based on mouse coordinates

#### Story 5.3: Add "The Dent" Interaction (click‑induced background dip)
As a user, I want the background to dip inward when I click so that the UI feels tactile.

**Acceptance Criteria:**
- **Given** a click event on the canvas
- **When** the event is detected
- **Then** the shader deforms the surface creating a dent animation that resets after 500 ms

#### Story 5.4: Add "The Bulge" Interaction (hover‑induced card expansion)
As a user, I want bounty cards to bulge and ripple the background on hover so that interactions feel responsive.

**Acceptance Criteria:**
- **Given** a card component
- **When** the mouse hovers over it
- **Then** the card scales up slightly and the surrounding oil‑slick ripples outward

#### Story 5.5: Implement "The Sink" Liquid Timer Visual
As a doer, I want a visual liquid timer that drains as my 10 minute challenge counts down so that I can see time remaining intuitively.

**Acceptance Criteria:**
- **Given** the 10 min timer state from the backend
- **When** the timer updates each second
- **Then** a liquid mesh height decreases proportionally, changing color to amber when < 60 s

#### Story 5.6: Implement "Atmospheric Gas" State Changes
As a user, I want the UI’s viscosity and color to reflect the current L2 gas price so that the visual mood matches network conditions.

**Acceptance Criteria:**
- **Given** a gas‑price feed
- **When** the price crosses defined thresholds
- **Then** the background shader adjusts speed/amplitude and applies a tint (green‑low, amber‑medium, red‑high)

#### Story 5.7: Add Bioluminescent Overlays for Interactive Elements
As a user, I want actionable UI elements to glow from beneath so that they stand out without breaking the aesthetic.

**Acceptance Criteria:**
- **Given** buttons, links, and icons
- **When** they become focusable or hovered
- **Then** a subtle bottom‑up glow effect is rendered via the shader

#### Story 5.8: Implement Effervescent Chat Bubbles
As a participant, I want chat messages to rise like bubbles through the oil so that conversations feel integrated with the environment.

**Acceptance Criteria:**
- **Given** a chat component
- **When** a new message arrives
- **Then** a bubble mesh spawns at the bottom and rises, fading out after 5 s

#### Story 5.9: Implement "The Vault" Disputed State Overlay
As a user, I want a frosted, lead‑glass overlay to appear when a bounty is disputed so that the state is clearly communicated.

**Acceptance Criteria:**
- **Given** a bounty in disputed status
- **When** the UI renders the bounty view
- **Then** a semi‑transparent overlay with blur and desaturation covers the content, disabling interaction

#### Story 5.10: Apply Typography and Color System (UX‑DR14)
As a designer, I want JetBrains Mono for data labels and PP Neue Montreal for headers so that the visual language is consistent.

**Acceptance Criteria:**
- **Given** global CSS variables
- **When** the app loads
- **Then** all data elements use Mono, all headings use Neue Montreal, with defined font‑sizes and weights

---

### Epic 6: Web3 Integration & Relayer
Users can complete gasless transactions and smart account abstraction works seamlessly.
**FRs covered:** FR.1.1 (Gasless Meta‑Transactions), FR.1.3 (Smart Account Abstraction)

#### Story 6.1: EIP‑712 Meta‑Transaction Service
As a developer, I want a backend service that creates and signs EIP‑712 meta‑transactions so users can submit actions without paying gas.

**Acceptance Criteria:**
- **Given** a request to perform a contract action
- **When** the service receives the request with user data
- **Then** it builds an EIP‑712 typed data payload, signs it with the relayer’s private key, and returns the signed payload

#### Story 6.2: Privy‑Linked Wallet Onboarding
As a user, I want to link my Web3 wallet to my Privy account so I can use the same identity for gasless actions.

**Acceptance Criteria:**
- **Given** a logged‑in Privy session
- **When** the user clicks "Link Wallet"
- **Then** the wallet address is stored in the user profile and associated with the JWT

#### Story 6.3: ERC‑4337 Smart Account Deployment
As a system, I need to automatically deploy an ERC‑4337 smart account for new users so they can interact with contracts without managing private keys.

**Acceptance Criteria:**
- **Given** a newly registered user without a smart account
- **When** the onboarding flow completes
- **Then** a smart account contract is deployed, its address saved to the user profile, and the user receives a confirmation

#### Story 6.4: Relayer Gas‑Tank Monitoring Dashboard
As an ops engineer, I want a dashboard that shows the relayer’s gas‑tank balance and alerts when it’s low so the service stays funded.

**Acceptance Criteria:**
- **Given** the relayer’s Ethereum address and a monitoring service
- **When** the balance falls below 10 % of the configured threshold
- **Then** an email/Slack alert is sent to the ops channel and the dashboard displays a red warning state

#### Story 6.5: End‑to‑End Gas‑less Transaction Tests
As a QA engineer, I want automated tests that exercise the full gas‑less flow (sign‑off → relayer → contract) to ensure reliability before release.

**Acceptance Criteria:**
- **Given** a test suite with a mock contract
- **When** a test triggers a gas‑less action
- **Then** the EIP‑712 payload is created, the relayer signs and submits it, and the mock contract records the expected state change
- **And** failures are reported with clear logs for each step


<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->
