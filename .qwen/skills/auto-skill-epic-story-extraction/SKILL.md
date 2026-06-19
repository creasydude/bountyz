---
name: epic-story-extraction
description: Extract requirements from PRD, Architecture, and UX documents to populate epic/story breakdown templates
source: auto-skill
extracted_at: '2026-06-19T11:59:56.493Z'
---

# Epic and Story Requirements Extraction

**Goal:** Extract functional requirements, non-functional requirements, and design requirements from PRD, Architecture, and UX documents to populate epic/story breakdown templates.

## Procedure

### 1. Activate the Skill

Follow the standard skill activation workflow:
- Resolve workflow configuration from customization files
- Execute any activation steps
- Load persistent facts
- Load config and greet the user
- Execute append steps

### 2. Validate Prerequisites

**Required Input Documents:**
- PRD document (full or sharded) containing functional and non-functional requirements
- Architecture document containing technical decisions and implementation patterns
- UX Design document (if exists) containing UI/UX specifications

**Document Search Priority:**
- PRD: `{planning_artifacts}/*prd*.md` or `{planning_artifacts}/*prd*/index.md`
- Architecture: `{planning_artifacts}/*architecture*.md` or `{planning_artifacts}/*architecture*/index.md`
- UX: `{planning_artifacts}/*ux*.md` or `{planning_artifacts}/*ux*/index.md`

### 3. Read All Input Documents

Read the entire PRD, Architecture, and UX documents (if applicable) before extraction.

### 4. Extract Functional Requirements (FRs)

From the PRD document, extract ALL functional requirements:

**Look for:**
- Numbered items like "FR1:", "Functional Requirement 1:", or similar
- Requirement statements that describe what the system must DO
- User actions, system behaviors, and business rules

**Format as:**
```
FR1: [Clear, testable requirement description]
FR2: [Clear, testable requirement description]
...
```

### 5. Extract Non-Functional Requirements (NFRs)

From the PRD document, extract ALL non-functional requirements:

**Look for:**
- Performance requirements (latency, throughput, FPS)
- Security requirements (encryption, audits, compliance)
- Usability requirements (UX patterns, accessibility)
- Reliability requirements (persistence, error handling)
- Scalability requirements

**Format as:**
```
NFR1: [Performance/Security/Usability requirement]
NFR2: [Performance/Security/Usability requirement]
...
```

### 6. Extract Additional Requirements from Architecture

Review the Architecture document for technical requirements:

**Look for:**
- Starter template specifications
- Infrastructure and deployment requirements
- Integration requirements with external systems
- Data migration or setup requirements
- Monitoring and logging requirements
- API versioning or compatibility requirements
- Security implementation requirements
- Architecture patterns (naming conventions, event systems, error handling)

**Important:** If a starter template is mentioned, note it prominently as it impacts Epic 1 Story 1.

**Format as:**
```
- [Technical requirement from Architecture that affects implementation]
- [Infrastructure setup requirement]
- [Integration requirement]
...
```

### 7. Extract UX Design Requirements (if UX document exists)

**CRITICAL:** UX Design Specification is a first-class input document, not supplementary material. Requirements from the UX spec must be extracted with the same rigor as PRD functional requirements.

**Look for:**
- Design token work: Color systems, spacing scales, typography tokens
- Component proposals: Reusable UI components identified in the UX spec
- Visual standardization: Semantic CSS classes, consistent color palette
- Accessibility requirements: Contrast audit fixes, ARIA patterns, keyboard navigation
- Responsive design requirements: Breakpoints, layout adaptations, mobile-specific interactions
- Interaction patterns: Animations, transitions, loading states, error handling UX
- Browser/device compatibility: Target platforms, progressive enhancement requirements

**Format UX Design Requirements as a SEPARATE section:**
```
UX-DR1: [Actionable UX design requirement with clear implementation scope]
UX-DR2: [Actionable UX design requirement with clear implementation scope]
...
```

**IMPORTANT:** Do NOT reduce UX requirements to vague summaries. Each UX-DR must be specific enough to generate a story with testable acceptance criteria.

### 8. Load and Initialize Template

Load the epic/story template and initialize the output file:

1. Copy the entire template to `{planning_artifacts}/epics.md`
2. Replace placeholders with actual content:
   - `{{project_name}}` → actual project name
   - `{{fr_list}}` → extracted FRs
   - `{{nfr_list}}` → extracted NFRs
   - `{{additional_requirements}}` → extracted additional requirements
   - `{{ux_design_requirements}}` → extracted UX Design Requirements (if exists)
3. Update frontmatter with extraction progress and input documents

### 9. Present Extracted Requirements

Display to user:

**Functional Requirements Extracted:**
- Show count of FRs found
- Display first few FRs as examples
- Ask if any FRs are missing or incorrectly captured

**Non-Functional Requirements Extracted:**
- Show count of NFRs found
- Display key NFRs
- Ask if any constraints were missed

**Additional Requirements (Architecture):**
- Summarize technical requirements from Architecture
- Verify completeness

**UX Design Requirements (if applicable):**
- Show count of UX-DRs found
- Display key UX Design requirements
- Verify each UX-DR is specific enough for story creation

### 10. Get User Confirmation

Ask: "Do these extracted requirements accurately represent what needs to be built? Any additions or corrections?"

Update the requirements based on user feedback until confirmation is received.

### 11. Save and Present Menu

After confirmation, save all requirements to `{planning_artifacts}/epics.md` and update frontmatter. Then present menu:

```
**Confirm the Requirements are complete and correct to [C] continue:**
```

**Menu Handling:**
- IF C: Save all to document, update frontmatter, then proceed to next step (e.g., step-02-design-epics.md)
- IF Any other comments or queries: Help user respond, then [Redisplay Menu Options]

### 12. Create Requirements Coverage Map

Create a mapping of requirements to architectural components:

- Map each FR to specific files/components (e.g., FR.1.1 → `apps/worker/src/relayer.ts`)
- Map each NFR to architecture decisions (e.g., NFR.2.1 → Redis persistence)
- Map UX-DRs to UI components (e.g., UX-DR3 → `apps/web/components/canvas/Background.tsx`)

This helps developers trace requirements to implementation.

## Key Principles

- **Never generate content without user input:** Always extract from documents, don't invent requirements
- **Read completely:** Always read entire step files and input documents before taking action
- **Be specific:** Each requirement must be testable and actionable
- **Maintain structure:** Follow the exact format specified in templates
- **Handle UX as first-class:** UX requirements are as important as functional requirements
- **Document everything:** Include all constraints, patterns, and decisions from Architecture
- **Validate with user:** Always confirm extraction completeness with the user

## Common Pitfalls to Avoid

1. **Vague summaries:** Don't reduce UX requirements to "create reusable components" — list all specific components
2. **Missing NFRs:** Don't forget performance, security, and reliability requirements
3. **Incomplete coverage:** Ensure every requirement has a traceable implementation path
4. **Ignoring architecture patterns:** Architecture documents contain critical patterns for consistency
5. **Skipping UX extraction:** UX design specs provide essential UI requirements for story creation
6. **Not confirming with user:** Always validate extraction completeness before proceeding

## Output Location

All extracted requirements are saved to:
- `{planning_artifacts}/epics.md`

This file serves as the foundation for subsequent steps (epic design, story creation, implementation).
