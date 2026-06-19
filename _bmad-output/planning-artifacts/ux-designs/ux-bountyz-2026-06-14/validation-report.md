# Validation Report — bountyZ

- **DESIGN.md:** `_bmad-output/planning-artifacts/ux-designs/ux-bountyz-2026-06-14/DESIGN.md`
- **EXPERIENCE.md:** `_bmad-output/planning-artifacts/ux-designs/ux-bountyz-2026-06-14/EXPERIENCE.md`
- **Run at:** 2026-06-14

## Overall verdict
The bountyZ Petroleum UI is an exceptionally strong atmospheric concept. The "Surface Tension" interaction language is a masterclass in translating Web3 state-machine logic into a visceral user experience. While the core "mechanical" coverage of flows and tokens is strong, the project faces **High-priority risks** in performance (R3F layout thrashing) and immersion (Privy signature popups).

## Category verdicts
- Flow coverage — strong
- Token completeness — adequate
- Component coverage — strong
- State coverage — strong
- Visual reference coverage — thin
- Bloat & overspecification — strong
- Inheritance discipline — strong
- Shape fit — strong
- Motion & Physics — high risk
- Web3 Friction — broken immersion

## Findings by severity

### High (2)
**[Motion Specialist]** — Performance: R3F Layout Thrashing (§ Foundation)
Unified distortion across DOM elements via <Html /> can cause heavy re-renders.
Fix: Ensure Html components use CSS 3D transforms to stay outside the main shader loop.

**[Web3 Friction Hunter]** — Immersion Break: Signature Overlay (§ Key Flows)
The inevitable Privy signature popup will break the liquid immersion.
Fix: Define a "Viscous Modal" that frames the popup to maintain the environmental theme.

### Medium (3)
**[Rubric Walker]** — Token Cross-refs (§ Accessibility Floor)
Missing explicit path.to.token references for text-on-background combinations.
Fix: Reference {tokens.colors.accents.biolume-cyan} vs {tokens.colors.base.crude-dark} explicitly.

**[Motion Specialist]** — Near-Death State (§ Interaction Primitives)
The "Sinking" timer needs more urgency as it nears zero.
Fix: Shift bar to hazard-amber and add vibration effect when < 60s.

**[Web3 Friction Hunter]** — Low Reservoir State (§ State Patterns)
No visual signal for when the Relayer Reservoir is low on gas.
Fix: Add a desaturated "Low Gas" amber tint to the entire slick.

### Low (3)
**[Rubric Walker]** — Ledger Mocks (§ Visual Reference Coverage)
Missing visual placeholders for "The Ledger" transition.
Fix: Render a key-screen mock at Finalize.

**[Motion Specialist]** — Ledger Opacity (§ Interaction Primitives)
"The Ledger" transition needs to define background behavior during the dive.
Fix: Specify "Sub-surface Opacity" in EXPERIENCE.md.

**[Web3 Friction Hunter]** — Stagnant Cooldown (§ State Patterns)
Cooldown state could be more punitive.
Fix: Make the oil look "Stagnant" (no iridescence, no movement).

## Reviewer files
- `review-rubric.md`
- `review-motion.md`
- `review-web3.md`
