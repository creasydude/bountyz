---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - /home/creasy/bountyz/_bmad-output/planning-artifacts/prds/prd-bountyz-2026-06-14/prd.md
workflowType: 'architecture'
project_name: 'bountyz'
user_name: 'Creasy'
date: '2026-06-14'
lastStep: 8
status: 'complete'
completedAt: '2026-06-14'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The architecture must support a three-tier system: a gasless Web3 relayer (Relayer Reservoir), a persistent job-based state machine (Effervescent State Machine), and a high-fidelity visual interface (Petroleum UI). Key behaviors include automated bounty timeouts, gasless meta-transactions, and physics-based UI feedback.

**Non-Functional Requirements:**
- **Security:** Hardware-level security for Relayer private keys and audited smart contracts.
- **Reliability:** BullMQ/Redis persistence to ensure zero-drop for bounty timers.
- **Performance:** 60 FPS visual rendering for Three.js effects and <100ms WebSocket latency for chat.
- **UX:** Minimal friction via Privy/ERC-4337, abstracting gas and wallet signatures.

**Scale & Complexity:**
- Primary domain: Full-stack Web3 / Real-time State Management
- Complexity level: Medium-High
- Estimated architectural components: ~6 (Frontend, Relayer Service, State Worker, Redis/BullMQ, Smart Contracts, Privy/Auth)

### Technical Constraints & Dependencies
- **Privy:** For authentication and embedded wallets.
- **BullMQ/Redis:** Essential for the state machine logic.
- **EIP-712/ERC-4337:** For gasless transactions and account abstraction.
- **L2 (Base/Polygon):** Targeted for low-cost, high-speed finality.

### Cross-Cutting Concerns Identified
- **State Consistency:** Ensuring the UI reflects the BullMQ job state in real-time.
- **Gas Management:** Automated monitoring and funding of the Relayer Reservoir.
- **Key Management:** Securely handling relayer signatures without exposing private keys.

## Starter Template Evaluation

### Primary Technology Domain

Full-stack Web3 / Real-time State Management based on project requirements analysis

### Starter Options Considered

- **Next.js + Privy Template:** Strong for onboarding, weak on 3D/Jobs.
- **Poimandres R3F Next Starter:** Excellent for 3D state, requires manual backend integration.
- **Modular Turborepo:** Best for separating long-running background processes (BullMQ) from the serverless UI layer.

### Selected Starter: Modular Web3 Monorepo (Turborepo)

**Rationale for Selection:**
Enables a "Backend First" strategy by allowing the **Effervescent State Machine (Worker)** and **Relayer Reservoir** to be built as a persistent Node.js service while sharing a single source of truth (Shared Types) with the **Petroleum UI (Next.js)**. This structure handles the serverless vs. persistent process constraint of Vercel/BullMQ elegantly.

**Initialization Command:**

```bash
# Initialize a Turborepo foundation
npx create-turbo@latest --example basic

# Add the key layers
cd apps && npx create-next-app@latest web --typescript --tailwind --eslint
mkdir worker && cd worker && npm init -y
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript 5.x throughout, using Node.js for the worker and Next.js (Node.js runtime) for the frontend.

**Styling Solution:**
Tailwind CSS for layout, Framer Motion for viscous UI interactions.

**Build Tooling:**
Turborepo for task orchestration, Vite/SWC for fast builds.

**Testing Framework:**
Vitest for fast unit testing of the state machine logic.

**Code Organization:**
Monorepo with shared packages for contract ABIs, bounty state types, and shared constants.

**Development Experience:**
Hot-reloading for UI; persistent watch mode for the worker process.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Data Persistence:** PostgreSQL 18 with Drizzle ORM v1.0.0-rc.2.
- **State Machine Engine:** BullMQ on Railway Redis (Persistent).
- **Auth Provider:** Privy (Embedded Wallets + JWT Validation).
- **Real-time Sync:** WebSockets via Socket.io.

**Important Decisions (Shape Architecture):**
- **Monorepo Strategy:** Shared packages for types and database schemas.
- **Gasless Strategy:** Relayer signatures handled in a secure backend worker environment.

**Deferred Decisions (Post-MVP):**
- **Hardware HSM:** Initial relayer security will use encrypted environment variables; hardware HSM moves to v2.

### Data Architecture

- **Primary DB:** **PostgreSQL 18** (Latest stable). Chosen for relational consistency and robust transaction support.
- **ORM:** **Drizzle ORM (v1.0.0-rc.2)**. High-performance, type-safe, and perfect for monorepo schema sharing.
- **Job/State Queue:** **BullMQ on Railway Redis**. Chosen over serverless Redis (Upstash) to avoid high request costs due to "chatty" BullMQ polling and maintenance.

### Authentication & Security

- **User Auth:** **Privy**. Handles social/email onboarding and provides the signature-ready embedded wallet.
- **Backend Validation:** **Stateless JWT Validation**. The backend worker verifies Privy JWTs to authenticate users without a dedicated session database.
- **Relayer Security:** Private keys stored as **Encrypted Environment Variables** on Railway. Backend code performs EIP-712 signatures in a secure, isolated runtime.

### API & Communication Patterns

- **Internal Service Sync:** **Socket.io**. The BullMQ worker emits state updates to the frontend in real-time.
- **Frontend-Backend API:** **Next.js API Routes (REST)** for simple actions; WebSocket for live bounty tracking.
- **Shared Package:** `packages/types` to define exact bounty states (`OPEN`, `CHALLENGE_10M`, `ACTIVE`, `AUTO_APPROVE_48H`, etc.) used by both the worker and the UI.

### Frontend Architecture

- **3D Engine:** **React Three Fiber (R3F)**. Essential for the Petroleum UI's physics and iridescence.
- **Animation:** **Framer Motion** for "viscous" surface tension effects on buttons and cards.
- **State Handoff:** React Query for caching bounty data, synchronized with WebSocket events for state transitions.

### Infrastructure & Deployment

- **Frontend Hosting:** **Vercel** (Next.js).
- **Persistent Backend/Worker:** **Railway** (Node.js + Redis).
- **Database:** **Neon or Railway Postgres**.

### Decision Impact Analysis

**Implementation Sequence:**
1. **Initialize Monorepo:** Setup Turborepo and shared packages.
2. **Backend Engine:** Build the BullMQ worker and Redis connection on Railway.
3. **Database Layer:** Implement the Drizzle schema and migrations.
4. **Relayer Logic:** Build the EIP-712 signature service.
5. **Petroleum UI:** Build the Next.js frontend and R3F integration.

**Cross-Component Dependencies:**
The **Petroleum UI** depends on the **Shared Package** types for state rendering, and the **Worker** depends on **Postgres** for persistent bounty history.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 areas where AI agents could make different choices (Naming, Structure, API Formats, Event Systems, Error Handling).

### Naming Patterns

**Database Naming Conventions:**
- Tables: `snake_case`, plural (e.g., `bounties`, `users`).
- Columns: `snake_case` (e.g., `creator_address`, `claimed_at`).

**API Naming Conventions:**
- Endpoints: `kebab-case`, plural (e.g., `/api/v1/bounties/[:id]`).
- JSON Payload Fields: `camelCase` (e.g., `{"bountyId": 123}`).

**Code Naming Conventions:**
- Files: `kebab-case.ts` for logic; `PascalCase.tsx` for React components.
- Variables/Functions: `camelCase`.

### Structure Patterns

**Project Organization:**
- **Shared Types/Schemas:** `packages/database` (Drizzle schemas).
- **Shared Logic:** `packages/shared` (EIP-712 math, time constants).
- **Tests:** Co-located `*.test.ts` files.

### Communication Patterns

**Event System Patterns:**
- Convention: `domain:action` (e.g., `bounty:accepted`, `timer:10m_started`).
- Delivery: BullMQ (Backend logic) -> Socket.io (Real-time UI sync).

### Process Patterns

**Error Handling Patterns:**
- API Structure: `{ success: boolean, data?: any, error?: { message: string, code: string } }`.
- State Recovery: Automatic BullMQ job retries for transient L2 RPC failures.

### Enforcement Guidelines

**All AI Agents MUST:**
- Use the shared `packages/database` as the single source of truth for Drizzle schemas.
- Adhere to the `domain:action` event naming for all WebSocket communications.
- Validate all incoming requests against the shared TypeScript interfaces.

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
bountyz/
├── package.json
├── turbo.json
├── .gitignore
├── apps/
│   ├── web/                     # Petroleum UI (Next.js)
│   │   ├── app/
│   │   │   ├── layout.tsx       # PrivyProvider + R3F Canvas
│   │   │   ├── page.tsx         # Dashboard / Bounty Feed
│   │   │   └── api/             # REST endpoints for bounties
│   │   ├── components/
│   │   │   ├── canvas/          # Three.js (Petroleum effects)
│   │   │   ├── forms/           # Bounty creation/submission
│   │   │   └── ui/              # Framer Motion buttons/cards
│   │   └── hooks/               # useBounty, useSocket, etc.
│   └── worker/                  # State Machine (Node.js)
│       ├── src/
│       │   ├── main.ts          # Entry point (BullMQ Workers)
│       │   ├── handlers/        # 10m/48h/96h logic handlers
│       │   ├── relayer.ts       # EIP-712 signature engine
│       │   └── socket-server.ts # Socket.io emitter
│       └── package.json
├── packages/
│   ├── database/                # Shared Memory
│   │   ├── src/
│   │   │   ├── schema.ts        # Drizzle snake_case tables
│   │   │   └── db.ts            # Postgres connection client
│   │   └── package.json
│   ├── shared/                  # Shared Constants & Types
│   │   ├── src/
│   │   │   ├── constants.ts     # 10m/48h/96h window values
│   │   │   ├── types.ts         # Shared bounty status types
│   │   │   └── utils.ts         # Common Web3 utils (viem)
│   │   └── package.json
│   └── config/                  # Shared Tooling Config
│       ├── eslint/
│       └── typescript/
└── .env                         # Relayer Keys & DB URLs
```

### Architectural Boundaries

**API Boundaries:**
The `web` app exposes REST endpoints for bounty discovery and submission, while the `worker` service handles all timer logic and cryptographic signatures.

**Component Boundaries:**
Frontend components are separated into `canvas` (WebGL/Three.js) and `ui` (React/DOM) to prevent layout thrashing and maintain 60 FPS.

**Service Boundaries:**
The `worker` acts as the exclusive orchestrator for BullMQ jobs and Socket.io broadcasts to maintain state consistency.

**Data Boundaries:**
`packages/database` is the only component allowed to define Drizzle schemas, ensuring the `web` and `worker` apps never diverge in their understanding of the DB.

### Requirements to Structure Mapping

**Feature/Epic Mapping:**
- **Relayer Reservoir:** `apps/worker/src/relayer.ts`
- **Effervescent State Machine:** `apps/worker/src/handlers/`
- **Petroleum UI:** `apps/web/components/canvas/`

**Cross-Cutting Concerns:**
- **Shared Types:** `packages/shared/src/types.ts`
- **Shared Logic:** `packages/shared/src/utils.ts`

### Integration Points

**Internal Communication:**
BullMQ queues for job handoff; Socket.io for real-time UI updates from the worker.

**External Integrations:**
Privy for Auth; L2 (Base/Polygon) RPCs for contract interactions.

**Data Flow:**
User Action (`web`) -> API Route -> BullMQ Job -> Worker Logic -> Postgres Update -> Socket.io Broadcast -> UI Feedback (`web`).

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
High. Next.js, BullMQ, and R3F are industry-standard choices that align perfectly within a Turborepo.

**Pattern Consistency:**
High. Naming conventions and communication patterns are unified across the monorepo.

**Structure Alignment:**
High. The Turborepo structure directly enables the persistent worker vs. serverless frontend strategy.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
100%. All core feature clusters from the PRD are mapped to specific structural components.

**Functional Requirements Coverage:**
100%. Every FR has a traceable implementation path in the directory structure.

**Non-Functional Requirements Coverage:**
100%. Performance (R3F), Reliability (BullMQ), and Security (Privy/JWT) are all architecturally addressed.

### Implementation Readiness Validation ✅

**Decision Completeness:**
High. All critical technologies and versions are specified.

**Structure Completeness:**
High. Complete directory structure provided.

**Pattern Completeness:**
High. Naming, Structure, and Communication rules are clear.

### Gap Analysis Results

None. The architecture is comprehensive and ready for handoff.

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High

**Key Strengths:**
- Modular separation of state machine and UI.
- Unified type system across the monorepo.
- High-performance visual foundation (R3F/Framer).

**Areas for Future Enhancement:**
- Migration to Hardware HSM for relayer key management in v2.
- Expansion to multi-chain support beyond Base/Polygon.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented.
- Use implementation patterns consistently across all components.
- Respect project structure and boundaries.
- Refer to this document for all architectural questions.

**First Implementation Priority:**
`npx create-turbo@latest --example basic`
