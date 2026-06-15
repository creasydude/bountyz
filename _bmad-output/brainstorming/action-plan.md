# bountyZ: Backend Implementation Roadmap

## 1. Infrastructure (The "Container")
**Goal:** A stable, dockerized environment.
- **Docker Compose:** Setup with `postgres`, `redis` (for BullMQ), and the `nestjs-app`.
- **Environment Management:** Clear separation of L2 RPC URLs, Privy Secrets, and Relayer Private Keys.

## 2. Phase 1: The Core State Machine (Non-Web3)
**Goal:** Implement the "10m / 48h / 96h" logic in isolation.
- **NestJS Modules:** `BountiesModule`, `UsersModule`, `TasksModule` (BullMQ).
- **Logic:** 
    - Create Bounty -> State: OPEN.
    - Accept Bounty -> State: ACTIVE, Schedule BullMQ Job (10m).
    - Job Fires -> Check if PROOF exists. If not, State: OPEN, Set User Cooldown (6h).
    - Submit Proof -> State: REVIEW, Schedule BullMQ Job (48h).
    - Job Fires -> Auto-Approve -> State: COMPLETED.

## 3. Phase 2: The Gasless Relayer (Web3 Integration)
**Goal:** Integrate Privy and Meta-Transactions.
- **Relayer Service:** A NestJS service that holds the "Gas Tank" wallet and uses `ethers.js` to submit signatures to the smart contract.
- **Privy Integration:** Backend validation of Privy JWTs to ensure "Doer" identity.
- **Contract Interface:** Define the Solidity methods for `createBounty`, `submitProof`, `dispute`.

## 4. Phase 3: The "Effervescent" Chat (Real-time)
- **WebSockets:** NestJS `@WebSocketGateway` using Redis as the adapter for scaling.
- **Rooms:** Join room by Bounty ID.

## 5. Phase 4: Frontend "Absorbent" Implementation
- **Stack:** React + Framer Motion + Three.js.
- **Implementation:** Connecting the UI "Liquid" effects to the backend state machine.

