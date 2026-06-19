---
title: bountyZ Petroleum UI - Design Specification
status: final
created: 2026-06-14
updated: 2026-06-14
tokens:
  colors:
    base:
      crude-black: "#0A0A0B"
      crude-dark: "#141416"
    iridescence:
      slick-rgb: "linear-gradient(135deg, #FF00FF 0%, #00FFFF 50%, #FFFF00 100%)"
      slick-subtle: "rgba(100, 100, 120, 0.1)"
    accents:
      biolume-cyan: "#00F5FF"
      biolume-green: "#00FFAB"
      hazard-amber: "#FFB800"
    vault:
      lead-matte: "#3A3A3C"
      glass-frost: "rgba(200, 200, 210, 0.2)"
    gas:
      low-viscosity: "rgba(0, 245, 255, 0.4)" # Cyan tint, fast flow
      high-viscosity: "rgba(255, 184, 0, 0.4)" # Amber tint, thick flow
  typography:
    families:
      mono: "'JetBrains Mono', monospace"
      sans: "'PP Neue Montreal', sans-serif"
    sizes:
      base: "16px"
      header: "2.5rem"
  rounded:
    none: "0px"
    viscous: "24px"
  spacing:
    fluid: "clamp(1rem, 5vw, 4rem)"
---

# Brand & Style
bountyZ is an **Atmospheric** Web3 environment. The brand is centered on the physical weight of digital actions. It avoids the "clean/bright" aesthetic of standard DeFi, opting for a dark, industrial, and organic feel. The environment is **Reactive**: it shifts its physical properties (viscosity, color) based on network conditions like gas prices.

**Keywords:** Viscous, Iridescent, Hardened, Physical.

# Colors
The palette is dominated by `crude-black`. Color is not used for decoration; it is an environmental effect. 
- **Iridescence**: Shifting RGB gradients that react to the `cursor`.
- **Bioluminescence**: High-contrast glows (`biolume-cyan`) used only for actionable elements.
- **Lead-Glass**: Desaturated grays used when funds are locked or in dispute.

# Typography
Brutalist and precise. We use `mono` for all data, labels, and timer values to emphasize the "State Machine" nature of the app. `sans` is used for high-level headings to provide a modern, premium contrast.

# Layout & Spacing
A **Single-Surface** approach. No boxes or borders; elements are separated by `elevation` (liquid depth) and `viscous` spacing. The UI should feel like it is floating in a tank of oil.

# Elevation & Depth
Depth is created through WebGL shaders. 
- **Sub-surface**: Items that are inactive or backgrounded.
- **Surface**: Actionable items that "dent" the slick.
- **Super-surface**: Bioluminescent overlays and modal "bubbles".

# Components
- **Bounty Card**: A dark tile that bulges towards the cursor.
- **Liquid Timer**: A vertical bar that "sinks" into the background as time expires.
- **Viscous Modal**: A modal container for Privy signature requests that "frames" the browser popup. The background slick must bulge outward around the modal's footprint to maintain environmental continuity.
- **Effervescent Bubble**: Chat messages that rise from the bottom, slightly distorting the background as they pass.

# Do's and Don'ts
- **DO**: Use physics-based transitions for every state change.
- **DO**: Maintain 60 FPS performance for background iridescence.
- **DON'T**: Use standard drop shadows; use "blur-behind" and "glow" instead.
- **DON'T**: Use white (#FFFFFF); use `biolume-cyan` or desaturated grays for text.
