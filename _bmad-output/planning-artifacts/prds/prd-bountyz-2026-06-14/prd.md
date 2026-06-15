---
title: bountyZ PRD
status: final
created: 2026-06-14
updated: 2026-06-14
---

# bountyZ PRD

## 1. Vision & Strategy

### 1.1 Vision Statement
To transform Web3 work from a series of abstract clicks into a visceral, high-stakes environment where trust has texture and performance is physical. bountyZ aims to replace the "ghosting" and friction of current bounty platforms with an "Atmospheric" experience where every action carries weight.

### 1.2 Target Audience
- Web3 "Doers" (Developers, Designers, Content Creators)
- "Creators" (Founders, DAO managers, Project leads)

### 1.3 Key Differentiators
- **"Absorbent" UX:** A visceral, liquid UI that makes trust and time feel physical.
- **Gasless "Relayer Reservoir":** Abstracting away the friction of L2 transactions.
- **Effervescent State Machine:** Hardened BullMQ lifecycle (10m/48h/96h) for high-trust accountability.

## 2. Target User

### 2.1 Jobs To Be Done

**For the "Doer" (Developer/Designer/Creator):**
- **Functional:** Find and complete high-signal tasks without fighting wallet popups or gas fees.
- **Emotional:** Feel the weight and importance of my contribution through a high-stakes, responsive environment.
- **Social:** Build a verifiable reputation based on "sign-of-life" consistency rather than just "ghostable" promises.

**For the "Creator" (Founder/DAO Lead):**
- **Functional:** Deploy capital and get results without constant manual follow-up or fear of abandoned tasks.
- **Emotional:** Experience a sense of control and "viscosity" in the workforce—knowing that an accepted task is backed by a hardened state machine.
- **Contextual:** Move fast with a "set it and forget it" escrow system that handles its own timeouts and approvals.

### 2.2 Key User Journeys
*Named-persona narratives the product enables. Numbered globally as UJ-1 through UJ-N.*

**UJ-1. The 10m Challenge (Alex, Freelance Developer)**
1. **Discovery:** Alex enters bountyZ. The background is a dark, iridescent oil slick. Alex hovers over a bounty card; it bulges with viscous tension.
2. **Acceptance:** Alex clicks "Accept". The UI pulses bioluminescently. A 10m liquid timer starts sinking into the petroleum background.
3. **The Work:** Alex realizes they need 15 minutes. They quickly upload a "Proof of Start" (a screenshot of the IDE).
4. **The Lock:** The liquid timer stops sinking. The bounty transition to ACTIVE.
5. **Success:** Alex finishes in 2 hours, submits the final proof. The 48h review window starts.

## 3. Glossary

- **Relayer Reservoir** — The backend abstraction layer that handles gas fees and meta-transactions, ensuring the user never sees a "Gas Fee" or wallet signature request for core bounty actions.
- **Effervescent State Machine** — The core logic engine (powered by BullMQ) that manages the time-locked lifecycle of a bounty (10m/6h/48h/96h).
- **Petroleum UI** — The visual language of bountyZ: dark, iridescent, liquid, and reactive. Uses physics-based interactions to simulate surface tension and viscosity.
- **Doer** — The user performing the work and earning the bounty.
- **Creator** — The user posting the bounty and funding the escrow.
- **10m Challenge** — The critical window post-acceptance where a Doer must provide a "Proof of Start" or lose access to the bounty.
- **6h Failure Cooldown** — The lockout period triggered when a Doer fails the 10m Challenge.
- **Lead-Glass Vault** — The UI state and smart contract lock triggered by a dispute, freezing funds and turning the UI matte gray/frozen.
- **Proof of Start** — A lightweight initial submission (text, link, or image) that satisfies the 10m Challenge and confirms the Doer is active.

## 4. Features & Functional Requirements

### 4.1 Cluster: Relayer Reservoir (Web3 Backend)
The engine that abstracts Web3 friction, allowing "Doers" to focus on work without worrying about gas or wallet management.

| ID | Feature | Description |
|---|---|---|
| FR.1.1 | **Gasless Meta-Transactions** | Support for EIP-712 signatures submitted via a backend relayer to the smart contract. |
| FR.1.2 | **Privy Auth Integration** | Validation of Privy JWTs for user identity and session management. |
| FR.1.3 | **Smart Account Abstraction** | Automatic deployment/management of ERC-4337 smart accounts for social/email users. |
| FR.1.4 | **Gas Tank Monitoring** | A backend dashboard or alert system for the "Reservoir" to ensure liquidity for relaying. |

### 4.2 Cluster: Effervescent State Machine (Core Logic)
The hardened logic engine that enforces accountability and prevents "ghosting" through timed locks and automated state transitions.

| ID | Feature | Description |
|---|---|---|
| FR.2.1 | **10m "Doer" Challenge** | When a bounty is accepted, the Doer has 10 minutes to submit an initial proof or sign-of-life. |
| FR.2.2 | **6h Failure Cooldown** | If the 10m window is missed, the bounty reverts to OPEN and the Doer is barred from accepting *any* bounty for 6 hours. |
| FR.2.3 | **48h Auto-Approval** | Submitted proof enters a 48h review window. If the Creator does not dispute or approve, it auto-approves. |
| FR.2.4 | **96h Safety Lock** | Post-submission, funds are locked for 96 hours before they can be withdrawn or cancelled, allowing for dispute resolution. |
| FR.2.5 | **BullMQ Orchestration** | All timers (10m, 6h, 48h, 96h) must be managed by BullMQ for reliability and persistence. |

### 4.3 Cluster: Petroleum UI (The "Absorbent" Experience)
The visceral visual layer that translates technical states into environmental effects (React + Three.js + Framer Motion).

| ID | Feature | Description |
|---|---|---|
| FR.3.1 | **Iridescent "Oil Slick" Background** | A shifting, dark background with oil-like iridescence that reacts to cursor movement. |
| FR.3.2 | **Viscous Tension Interactions** | Buttons and cards that bulge or deform towards the cursor, simulating physical surface tension. |
| FR.3.3 | **Liquid Timer Visuals** | The 10m window visualized as liquid slowly draining or sinking into the background. |
| FR.3.4 | **Atmospheric Gas States** | UI shifts color or viscosity (e.g., turns amber/thick) based on current L2 gas prices. |
| FR.3.5 | **Bioluminescent Overlays** | Actionable items glow from "underneath" the petroleum surface. |
| FR.3.6 | **Effervescent Chat Bubbles** | Bounty-specific chat messages that rise like bubbles through the oil. |
| FR.3.7 | **Lead-Glass Vault (Disputed State)** | UI turns matte gray and "frozen" for bounties in dispute or locked funds. |

## 5. Non-Functional Requirements (NFRs)

### 5.1 Security & Compliance
- **NFR.1.1 (Relayer Security):** Private keys for the Gas Tank must be stored in a hardware security module (HSM) or encrypted environment variables, never logged.
- **NFR.1.2 (Smart Contract Audit):** Escrow and Relayer contracts must be verified on-chain.

### 5.2 Reliability & Scalability
- **NFR.2.1 (Timer Persistence):** All BullMQ jobs must persist in Redis to survive server restarts.
- **NFR.2.2 (L2 Latency):** The system must handle L2 (e.g., Base or Polygon) finality delays gracefully in the UI.

### 5.3 Performance & UX
- **NFR.3.1 (Visual Smoothness):** Three.js/Framer Motion effects must maintain 60 FPS on modern browsers.
- **NFR.3.2 (WebSocket Latency):** "Effervescent Chat" must have <100ms latency for message delivery within rooms.

## 6. Cross-Cutting Concerns
- **Gas Management:** How the "Reservoir" is funded and protected from depletion/abuse.
- **Dispute Resolution:** The manual or automated path when the "Lead-Glass Vault" is triggered.

## 7. Success Metrics
- **"Ghost" Rate:** <5% of accepted bounties result in a 6h cooldown.
- **Retention:** >30% of Doers accept a second bounty within 7 days.
- **Friction:** Average time from "Sign Up" to "Accept Bounty" < 2 minutes (Gasless + Privy).

## 8. Non-Goals
- **In-App Payment Processing:** We are not building a fiat-to-crypto ramp. Funds must be in the Reservoir/Escrow.
- **Full Project Management:** We are not building Jira for Web3. This is a task-level bounty system.
- **Identity Verification (KYC):** We rely on Privy/Wallet for identity; bountyZ does not perform its own KYC.

## 9. MVP Scope

### 9.1 In Scope
- Gasless bounty acceptance and submission via Relayer Reservoir.
- Hardened BullMQ timers (10m, 6h, 48h, 96h).
- Petroleum UI theme (Iridescent background, viscous interactions).
- Basic dispute triggering (Lead-Glass Vault).

### 9.2 Out of Scope for MVP
- Mobile application (MVP is Web-first).
- Multi-token support (v1 is single-chain, single-token, likely USDC on Base).
- Complex reputation scoring (v1 is binary: Fail 10m window = Cooldown).
