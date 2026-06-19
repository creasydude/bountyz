---
title: bountyZ Petroleum UI - Experience Specification
status: final
created: 2026-06-14
updated: 2026-06-14
sources:
  - file:_bmad-output/planning-artifacts/prds/prd-bountyz-2026-06-14/prd.md
  - file:_bmad-output/planning-artifacts/architecture.md
---

# Foundation
**Form-Factor:** Desktop-first Web Application.
**UI System:** Custom React Three Fiber (R3F) Scene-as-Layout. Standard DOM elements are injected into the WebGL scene using `@react-three/drei`'s `<Html />` component to ensure unified distortion.

# Information Architecture
The app is a single, fluid view partitioned by depth:
1. **The Reservoir (Background)**: The constant iridescent slick.
2. **The Flow (Main Feed)**: A vertically scrolling stream of bounty "droplets".
3. **The Focus (Active Context)**: A zoomed-in view of a single bounty, pulling it to the "Super-surface".
4. **The Ledger (Creator Dashboard)**: A sub-surface layer accessed by "diving" (scrolling past the bottom), showing success metrics (Ghost Rate, Retention) as data-ripples in the oil.
5. **The Vault (Dispute State)**: An overlay that frosts the entire scene.

# Voice and Tone
**Direct. Clinical. Heavy.**
Text should be minimal. We use "Hardened" language.
- Instead of "You missed the deadline", use "10m Challenge Failed. 6h Cooldown Engaged."
- Instead of "Loading...", use "Saturating..."

# Interaction Primitives
- **The Dent**: Clicking any element causes the background slick to "dip" inward at the contact point.
- **The Bulge**: Hovering over a card causes the card to expand toward the user and the surrounding slick to ripple.
- **The Sink**: The 10m timer is a physical object that slowly disappears under the background slick.
- **Viscosity Shift**: As L2 gas prices rise, the background shader's `speed` decreases and `amplitude` increases, making the oil look thicker and slower.

# State Patterns
- **Active**: Bioluminescent glow enabled. Background iridescence intensity high.
- **Saturating (Retry)**: The iridescent slick swirls into a whirlpool around the active component. UI text reads "Saturating..." until the background job succeeds.
- **Cooldown**: Iridescence disabled. Background becomes static `crude-black`. Biolume-cyan shifts to desaturated gray.
- **Vaulted**: Frosted lead-glass overlay (blur + desaturation). All physics interactions become "stiff" or "frozen".

# Key Flows

### Flow 1: Accepting the Challenge (Alex's Journey)
**Protagonist:** Alex, developer.
1. **Entrance**: Alex hovers over a bounty. The card bulges. Iridescence swirls around the cursor.
2. **Acceptance**: Alex clicks "Accept". The UI "dents" deeply, then a cyan ripple pulses from the button across the entire screen.
3. **Timer Start**: A bioluminescent 10m bar appears at the top. It begins "sinking" into the oil.
4. **Proof Submission**: Alex uploads a file. The file icon "bubbles" up from the bottom and merges into the bounty card. The sinking timer stops and dissolves into the background.

# Accessibility Floor
- **Focus Indicators**: Instead of outlines, we use a high-intensity `{tokens.colors.accents.biolume-cyan}` sub-surface glow.
- **Motion Control**: A "Low Viscosity" mode must be available to disable heavy WebGL distortion for users with motion sensitivity.
- **Contrast**: All `mono` text must maintain a 4.5:1 ratio (e.g., `{tokens.colors.accents.biolume-cyan}` on `{tokens.colors.base.crude-dark}`).
ion for users with motion sensitivity.
- **Contrast**: All `mono` text must maintain a 4.5:1 ratio against the `crude-dark` background.
ground.
