# Motion Specialist Review — bountyZ

## Overall verdict
The motion language is the standout feature of this UX. The "Surface Tension" metaphor is brilliant for a Web3 app, as it makes abstract transactions feel physical. However, there are significant performance risks in the "Single-Surface" R3F architecture that need mitigation.

## Findings
- **[high]** Performance Risk: "unified distortion" across DOM (via Html component) and WebGL background can lead to heavy layout thrashing if not managed via separate rendering layers. *Fix:* Ensure the `Html` components in R3F are transformed via CSS 3D and not triggering full WebGL shader re-renders for simple text updates.
- **[medium]** User Feedback: The "Sinking" timer is a physical object, but missing a "Near-Death" acceleration or color shift when the 10m window is < 60s. *Fix:* Update EXPERIENCE.md to specify that the `biolume-cyan` shifts to `hazard-amber` and "vibrates" when the sink is almost complete.
- **[low]** Transition Conflict: Scrolling to "The Ledger" (sub-surface) needs to define if the iridescence continues or if the oil becomes more "opaque" as the user dives. *Fix:* Specify "Sub-surface Opacity" in EXPERIENCE.md.
