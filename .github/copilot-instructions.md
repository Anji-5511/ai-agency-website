# AI Agency Website — Copilot Instructions

## Project

Build a premium, modern, interactive AI agency website.

The website should feel like a high-end AI technology company or creative AI agency — not a generic SaaS template.

## Technology

Use:

* React.js
* JavaScript
* Vite
* Tailwind CSS
* Motion for React animations
* Lenis for smooth scrolling
* Lucide React for icons

## Important Technology Rules

* Use JavaScript only.
* Do NOT use TypeScript.
* Do NOT create `.ts` or `.tsx` files.
* Use `.js` and `.jsx`.
* Keep the project simple and understandable for a beginner.
* Prefer reusable React components.
* Avoid unnecessary dependencies.

## Design Direction

Create a premium dark cinematic visual style.

Design characteristics:

* Deep charcoal/black backgrounds
* Blue, violet, and subtle cyan accents
* Soft gradients
* Subtle glow effects
* Large modern typography
* Generous spacing
* Clean layouts
* High-quality cards
* Subtle borders
* Premium hover states
* Sophisticated motion
* Strong visual hierarchy

Avoid:

* Generic SaaS layouts
* Excessive gradients
* Excessive glow
* Random animations
* Cluttered interfaces
* Overly rounded everything
* Cheap-looking UI
* Excessive text
* Template-like designs

## Animation

Use Motion for React animations.

Animations should feel:

* Smooth
* Premium
* Intentional
* Subtle
* Fast enough to feel responsive

Use animations for:

* Page entrance
* Section reveals
* Hover interactions
* Card interactions
* Buttons
* Navigation
* Scroll-based movement
* Hero visual effects
* Workflow animations

Avoid excessive animation that hurts performance or usability.

## Smooth Scrolling

Use Lenis for smooth scrolling.

Scrolling should feel:

* Fluid
* Natural
* Premium
* Responsive

Do not introduce unnecessary scroll-jacking behavior.

## Responsive Design

Every section must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

Do not treat mobile as an afterthought.

## Accessibility

Follow good accessibility practices.

Use:

* Semantic HTML
* Proper heading hierarchy
* Accessible buttons
* Accessible navigation
* Keyboard-friendly interactions
* Appropriate contrast
* Meaningful labels

Do not rely only on color or animation to communicate information.

## Component Architecture

Prefer reusable components.

Organize the project logically.

Use components for reusable UI elements such as:

* Buttons
* Cards
* Navigation
* Section headings
* Badges
* Icons
* Animated elements

Keep large sections separate from reusable components.

## External Components

External React components may be used when they improve the design.

Possible sources include:

* Aceternity UI
* Magic UI
* React Bits
* 21st.dev
* shadcn/ui

Do not install or use an entire library unnecessarily.

Only introduce an external component when it provides a clear benefit.

Adapt external components to match this project's design system.

## Critical Development Workflow

This is extremely important.

DO NOT build the entire website at once.

Build the website one section at a time.

The workflow is:

1. Complete the current task.
2. Verify that the implementation works.
3. Stop.
4. Do not automatically implement the next section.
5. Wait for the user to review and approve the current result.
6. Only continue when the user explicitly asks to proceed.

Never create multiple website sections when the user requested only one section.

## Current Build Order

Build in this order:

1. Project foundation
2. Design system
3. Smooth scrolling
4. Navbar
5. Hero
6. Trusted companies
7. AI capabilities
8. Interactive AI demo
9. Services
10. AI agent workflow
11. Case studies
12. Process
13. Technology stack
14. Testimonials
15. CTA
16. Footer
17. Responsive refinement
18. Animation refinement
19. Performance optimization
20. Final quality audit

Only work on the current requested step.

## Before Making Changes

Before implementing a significant task:

* Inspect the existing project.
* Understand the existing component structure.
* Reuse existing components when appropriate.
* Do not unnecessarily rewrite working code.
* Do not delete working functionality without a reason.

## Code Quality

Keep code:

* Clean
* Readable
* Modular
* Maintainable
* Beginner-friendly

Avoid unnecessary abstraction.

Do not create complicated architecture for simple functionality.

## Design Consistency

Every new section must follow the existing design system.

Maintain consistency in:

* Typography
* Spacing
* Colors
* Borders
* Shadows
* Radius
* Motion
* Buttons
* Interactive states

Do not introduce a completely different visual style for a new section.

## Performance

Keep animations performant.

Prefer transform and opacity animations.

Avoid unnecessary expensive effects.

Do not add large dependencies without a clear reason.

Optimize images and assets where appropriate.

## Important Agent Behavior

Do not assume future requirements.

Do not implement future sections.

Do not make large unrelated changes.

Do not refactor unrelated files while implementing a section.

If something is unclear, explain the issue before making a major architectural decision.

After completing the requested task, provide a concise summary of:

* What was changed
* Which files were changed
* How to test it
* Any important notes

Then stop and wait for further instructions.
