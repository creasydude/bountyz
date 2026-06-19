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
Platform architecture established with shared packages, database schema, and core patterns for development.
**FRs covered:** NFR.1.1, NFR.1.2, NFR.2.1, NFR.2.2, NFR.3.1, NFR.3.2, Additional (Starter Template, Infrastructure, Patterns)

### Epic 2: Authentication & User Management
Users can sign up, authenticate via Privy, and manage their profiles.
**FRs covered:** FR.1.2 (Privy Auth Integration), NFR.1.1 (Relayer Security), Additional (Key Management)

### Epic 3: Bounty Creation & Discovery
Creators can post bounties with funding, and Doers can discover and browse available bounties.
**FRs covered:** FR.1.1 (Gasless Meta-Transactions - partial), FR.1.4 (Gas Tank Monitoring - partial)

### Epic 4: Bounty Lifecycle Management
The core bounty workflow with state machine, timers, and approvals works end-to-end.
**FRs covered:** FR.2.1 (10m Challenge), FR.2.2 (6h Cooldown), FR.2.3 (48h Auto-Approval), FR.2.4 (96h Safety Lock), FR.2.5 (BullMQ Orchestration)

### Epic 5: Petroleum UI Experience
Users experience the visceral, "absorbent" bounty platform with oil slick backgrounds, viscous interactions, and liquid timers.
**FRs covered:** FR.3.1 (Iridescent Background), FR.3.2 (Viscous Tension), FR.3.3 (Liquid Timer), FR.3.4 (Atmospheric Gas), FR.3.5 (Bioluminescent Overlays), FR.3.6 (Chat Bubbles), FR.3.7 (Lead-Glass Vault), UX-DR1 through UX-DR15

### Epic 6: Web3 Integration & Relayer
Users can complete gasless transactions and smart account abstraction works seamlessly.
**FRs covered:** FR.1.1 (Gasless Meta-Transactions), FR.1.3 (Smart Account Abstraction)

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
